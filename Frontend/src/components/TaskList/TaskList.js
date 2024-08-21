import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TaskList.css'; // Import custom CSS file for styling

function TaskList() {
    const [todoList, setTodoList] = useState([]);
    const [editTask, setEditTask] = useState({});

    useEffect(() => {
        fetchTodoList();
    }, []);

    const fetchTodoList = () => {
        // Send the user's ID along with the request
        axios.get('http://localhost:3001/TaskList', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you store the token in localStorage
            }
        })
            .then(result => {
                setTodoList(result.data);
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/TaskList/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(result => {
                console.log('Task deleted successfully');
                fetchTodoList(); // Fetch updated todo list after deletion
            })
            .catch(err => console.log(err));
    };

    const handleEdit = (task) => {
        setEditTask(task);
    };

    const handleUpdate = () => {
        axios.post(`http://localhost:3001/TaskList/${editTask._id}`, editTask, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(result => {
                console.log('Task updated successfully');
                setEditTask({}); // Clear editTask state after updating
                fetchTodoList(); // Fetch updated todo list after updating
            })
            .catch(err => console.log(err));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditTask(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="task-list-container">
            <div id="task-list-box">
                <h2>Task List</h2>
                <table className="task-list-table">
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Status</th>
                            <th>Deadline</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todoList.map(task => (
                            <tr key={task._id}>
                                <td>
                                    <input
                                        type="text"
                                        name="task"
                                        value={editTask._id === task._id ? editTask.task : task.task}
                                        onChange={handleChange}
                                        className="task-list-edit-input"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="status"
                                        value={editTask._id === task._id ? editTask.status : task.status}
                                        onChange={handleChange}
                                        className="task-list-edit-input"
                                    />
                                </td>
                                <td>{new Date(task.deadline).toLocaleString()}</td>
                                <td className="task-list-actions">
                                    {editTask._id === task._id ? (
                                        <button className="edit-btn" onClick={() => handleUpdate()}>Save</button>
                                    ) : (
                                        <button className="edit-btn" onClick={() => handleEdit(task)}>Edit</button>
                                    )}
                                    <button className="delete-btn" onClick={() => handleDelete(task._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TaskList;
