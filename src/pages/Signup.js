import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, setCurrentUser } from '../utils/auth';
import '../styles/common.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const result = registerUser(email, password);
    if (result.success) {
      setCurrentUser(email);
      navigate('/profile');
    } else {
      setError(result.message || 'Registration failed');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Welcome to Habitus</h1>
        <h2>Sign Up</h2>
        <p>Create your account to start your wellness journey</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Create a password (min. 6 characters)"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
            />
          </div>
          
          <button type="submit" className="btn">Sign Up</button>
        </form>
        
        <Link to="/login" className="link">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;





