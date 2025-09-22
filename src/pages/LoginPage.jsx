import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // In a real application, you would perform authentication here.
        // For this demo, we'll just call the onLogin callback.
        if (email && password) {
            onLogin();
        } else {
            alert('Please enter both email and password.');
        }
    };

    return (
        <div className="login-page-container">
            <div className="card login-card">
                <h2 className="login-header">Login to ExTrack</h2>
                <form className="login-form" onSubmit={handleLogin}>
                    <div>
                        <label className="form-label" htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="form-label" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn">
                        <LogIn size={20} style={{ marginRight: '8px' }} />
                        Login
                    </button>
                </form>
                <p className="form-footer-text">
                    Don't have an account? <a href="#">Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;        