import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Import CSS file for custom styles

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/register', { username, password });
            console.log('Registration successful:', response.data);
            navigate('/');
        } catch (error) {
            console.error('Registration error:', error.response.data.message);
            setError(error.response.data.message);
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2 className="register-heading">Register</h2>
                {error && <div className="register-error">{error}</div>}
                <form className="register-form" onSubmit={handleRegister}>
                    <div className="form-group">
                        <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-register">Register</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
