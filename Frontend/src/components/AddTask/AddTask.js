import React, { useState } from 'react';
import axios from 'axios';
import './AddTask.css'; // Import custom CSS file for styling

function AddTask() {
    const [task, setTask] = useState('');
    const [status, setStatus] = useState('');
    const [deadline, setDeadline] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const localStorage = window.localStorage;

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!task || !status || !deadline) {
            setErrorMessage('All fields are required');
            return;
        }
        try {
            const token = localStorage.getItem('token'); // Get the JWT token from local storage
            const response = await axios.post(
                'http://localhost:3001/AddTask',
                { task, status, deadline },
                { headers: { Authorization: `Bearer ${token}` } } // Include JWT token in the request headers
            );
            console.log('Task added:', response.data);
            // Optionally, you can redirect or show a success message
            setTask('');
            setStatus('');
            setDeadline('');
            setErrorMessage('');
        } catch (error) {
            if (error.response && error.response.data) {
                console.error('Error adding task:', error.response.data.message);
                setErrorMessage('Error adding task. Please try again.');
            } else {
                console.error('Error adding task:', error.message);
                setErrorMessage('Error adding task. Please try again.');
            }
        }
    };
    
    

    return (
        <div className="add-task-page">
            <div className="add-task-container">
                <h2>Add New Task</h2>
                <form onSubmit={handleAddTask}>
                    <div className="form-group">
                        <input type="text" value={task} onChange={(e) => setTask(e.target.value)} className="form-control" placeholder="Enter task" required />
                    </div>
                    <div className="form-group">
                        <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} className="form-control" placeholder="Enter status" required />
                    </div>
                    <div className="form-group">
                        <input type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="form-control" required />
                    </div>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button type="submit" className="btn btn-primary">Add Task</button>
                </form>
            </div>
        </div>
    );
}

export default AddTask;
