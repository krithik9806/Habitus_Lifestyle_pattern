import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';
import { saveUserData } from '../utils/storage';
import '../styles/common.css';

function DailyHabits() {
  const [sleepHours, setSleepHours] = useState('');
  const [waterIntake, setWaterIntake] = useState('');
  const [energyLevel, setEnergyLevel] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = getCurrentUser();
    if (!user) {
      navigate('/login');
      return;
    }

    saveUserData(user.email, {
      dailyHabits: {
        sleepHours: parseFloat(sleepHours),
        waterIntake: parseFloat(waterIntake),
        energyLevel: parseInt(energyLevel)
      }
    });

    navigate('/dashboard');
  };

  return (
    <div className="container">
      <div className="card">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '83%' }}></div>
        </div>
        <h1>Daily Habits</h1>
        <h2>Your Daily Metrics</h2>
        <p>Tell us about your daily habits and energy levels</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="sleepHours">Average Sleep Hours (per day)</label>
            <input
              type="number"
              id="sleepHours"
              value={sleepHours}
              onChange={(e) => setSleepHours(e.target.value)}
              required
              min="0"
              max="24"
              step="0.5"
              placeholder="e.g., 7.5"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="waterIntake">Water Intake (liters per day)</label>
            <input
              type="number"
              id="waterIntake"
              value={waterIntake}
              onChange={(e) => setWaterIntake(e.target.value)}
              required
              min="0"
              max="20"
              step="0.1"
              placeholder="e.g., 2.5"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="energyLevel">Energy Level (1-10)</label>
            <input
              type="number"
              id="energyLevel"
              value={energyLevel}
              onChange={(e) => setEnergyLevel(e.target.value)}
              required
              min="1"
              max="10"
              placeholder="Rate your energy level (1-10)"
            />
            <small style={{ color: '#666', fontSize: '12px', marginTop: '5px', display: 'block' }}>
              1 = Very Low, 10 = Very High
            </small>
          </div>
          
          <button type="submit" className="btn">View Dashboard</button>
        </form>
      </div>
    </div>
  );
}

export default DailyHabits;





