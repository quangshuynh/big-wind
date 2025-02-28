// frontend/src/components/Auth/Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/authSlice'; //import action
import { loginUser } from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const data = await loginUser(username, password);
            dispatch(loginSuccess({ username: data.username, token: data.token }));
            navigate('/game'); //go to game
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
            setError(errorMessage);
        }
    };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Pfft Clicker</h1>
      <p className="auth-subtitle">The gassiest game around!</p>
      
      <h2><span className="fart-icon">💨</span> Login</h2>
      
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        
        <button type="submit" className="button-with-icon">
          <span className="fart-icon">💨</span> Login
        </button>
      </form>
      
      <p>
        Don't have an account? <Link to="/register" className="auth-link">Register here</Link>
      </p>
    </div>
  );
}

export default Login;
