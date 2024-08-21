const express = require('express') 
const mongoose = require('mongoose') 
const cors = require('cors') 
const TodoModel = require("./models/todoList") 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/user');

var app = express(); 
app.use(cors()); 
app.use(express.json()); 

// Connect to your MongoDB database (replace with your database URL) 
mongoose.connect("mongodb://127.0.0.1/todo"); 

// Check for database connection errors 
mongoose.connection.on("error", (error) => { 
	console.error("MongoDB connection error:", error); 
}); 

// Get saved tasks from the database 
app.get("/TaskList", authenticateToken, async (req, res) => {
    const userId = req.user.userId; // Extract userId from JWT token
    try {
        const todoList = await TodoModel.find({ userId }); // Filter tasks by userId
        res.json(todoList);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add new task to the database 
app.post("/AddTask", authenticateToken, async (req, res) => {
    const { task, status, deadline } = req.body;
    const userId = req.user.userId; // Extract userId from JWT token
    try {
        const todo = await TodoModel.create({ task, status, deadline, userId }); // Include userId when creating task
        res.json(todo);
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update task fields (including deadline) 
app.post("/TaskList/:id", (req, res) => { 
	const id = req.params.id; 
	const updateData = { 
		task: req.body.task, 
		status: req.body.status, 
		deadline: req.body.deadline, 
	}; 
	TodoModel.findByIdAndUpdate(id, updateData) 
		.then((todo) => res.json(todo)) 
		.catch((err) => res.json(err)); 
}); 

// Delete task from the database 
app.delete("/TaskList/:id", (req, res) => { 
	const id = req.params.id; 
	TodoModel.findByIdAndDelete({ _id: id }) 
		.then((todo) => res.json(todo)) 
		.catch((err) => res.json(err)); 
}); 

// User registration route
app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({ username, password: hashedPassword });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, 'your_secret_key');

        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, 'your_secret_key', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Use the middleware to protect routes
app.use(authenticateToken);

app.listen(3001, () => { 
	console.log('Server running on 3001'); 
}); 
