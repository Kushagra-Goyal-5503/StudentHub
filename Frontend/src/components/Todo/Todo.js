import React from 'react';
import { Link } from 'react-router-dom';
import './Todo.css'; // Import custom CSS file for styling

function Todo() {
    return (
        <div className="todo-container">
            <div className="todo-content">
                <h2 className="todo-heading">Welcome to Your To-do List</h2>
                <p className="todo-description">Keep track of your tasks and stay organized!</p>
                <div className="todo-buttons">
                    <Link to="/AddTask" className="btn btn-primary todo-btn">Add New Task</Link>
                    <Link to="/TaskList" className="btn btn-secondary todo-btn">View Tasks</Link>
                </div>
            </div>
        </div>
    );
}

export default Todo;
