// Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import CSS file for custom styles

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/login', { username, password });
            localStorage.setItem('token', response.data.token);
            console.log('Login successful:', response.data);
            navigate('/home');
        } catch (error) {
            console.error('Login error:', error.response.data.message);
            setError(error.response.data.message);
        }
    };

    const handleRegister = () => {
        // Redirect to the registration page
        navigate('/register');
    };

    return (
        <body>
            <div className="login-Page">
                <div className="login-container">
                    <div className="login-box">
                        <h2 className="login-heading">Login</h2>
                        {error && <div className="login-error">{error}</div>}
                        <form className="login-form" onSubmit={handleLogin}>
                            <div className="form-group">
                                <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                            </div>
                            <div className="form-buttons">
                                <button type="submit" className="btn btn-primary btn-login">Login</button>
                                <button type="button" className="btn btn-secondary btn-login" onClick={handleRegister}>Create New User</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default Login;
