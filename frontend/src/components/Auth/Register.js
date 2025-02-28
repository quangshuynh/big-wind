// frontend/src/components/Auth/Register.js
import React, { useState } from 'react';
import { registerUser } from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try{
      await registerUser(username, password);
      navigate('/login');
    }catch(error){
      const errorMessage = error.response?.data?.message || 'Registration failed.';
      setError(errorMessage);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Pfft Clicker</h1>
      <p className="auth-subtitle">Join the gassy adventure!</p>
      
      <h2><span className="fart-icon">💨</span> Register</h2>
      
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
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
            placeholder="Create a password"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />
        </div>
        
        <button type="submit" className="button-with-icon">
          <span className="fart-icon">💨</span> Register
        </button>
      </form>
      
      <p>
        Already have an account? <Link to="/login" className="auth-link">Login here</Link>
      </p>
    </div>
  );
}

export default Register;
