import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, setCurrentUser } from '../utils/auth';
import '../styles/common.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const result = loginUser(email, password);
    if (result.success) {
      setCurrentUser(email);
      // Check if user has completed profile
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const data = userData[email];
      
      if (!data || !data.profile) {
        navigate('/profile');
      } else if (!data.physicalHealth) {
        navigate('/physical-health');
      } else if (!data.mentalWellness) {
        navigate('/mental-wellness');
      } else if (!data.dailyHabits) {
        navigate('/daily-habits');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError(result.message || 'Invalid email or password');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Welcome to Habitus</h1>
        <h2>Login</h2>
        <p>Sign in to continue your wellness journey</p>
        
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
              placeholder="Enter your password"
            />
          </div>
          
          <button type="submit" className="btn">Login</button>
        </form>
        
        <Link to="/signup" className="link">
          Don't have an account? Sign up
        </Link>
      </div>
    </div>
  );
}

export default Login;





