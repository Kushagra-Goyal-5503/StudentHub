const mongoose = require('mongoose'); 

const todoSchema = new mongoose.Schema({ 
	task: { 
		type: String, 
		required: true, 
	}, 
	status: { 
		type: String, 
		required: true, 
	}, 
	deadline: { 
		type: Date, 
	}, 
	userId: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User',
		required: true,
	},
}); 


const todoList = mongoose.model("todo", todoSchema); 

module.exports = todoList;
