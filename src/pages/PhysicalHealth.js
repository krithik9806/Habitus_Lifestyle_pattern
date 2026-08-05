import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';
import { saveUserData } from '../utils/storage';
import '../styles/common.css';

function PhysicalHealth() {
  const [selectedConditions, setSelectedConditions] = useState([]);
  const navigate = useNavigate();

  const conditions = [
    'Vitamin D3 Efficiency',
    'Low Haemoglobin',
    'Thyroid Issues',
    'Diabetes',
    'High Blood Pressure',
    'None'
  ];

  const handleCheckboxChange = (condition) => {
    if (condition === 'None') {
      setSelectedConditions(['None']);
    } else {
      setSelectedConditions(prev => {
        const filtered = prev.filter(c => c !== 'None');
        if (filtered.includes(condition)) {
          return filtered.filter(c => c !== condition);
        } else {
          return [...filtered, condition];
        }
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = getCurrentUser();
    if (!user) {
      navigate('/login');
      return;
    }

    const finalConditions = selectedConditions.length === 0 ? ['None'] : selectedConditions.filter(c => c !== 'None');

    saveUserData(user.email, {
      physicalHealth: finalConditions
    });

    navigate('/mental-wellness');
  };

  return (
    <div className="container">
      <div className="card">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '33%' }}></div>
        </div>
        <h1>Physical Health</h1>
        <h2>Health Conditions</h2>
        <p>Select any health conditions that apply to you (you can select multiple)</p>
        
        <form onSubmit={handleSubmit}>
          <div className="checkbox-group">
            {conditions.map((condition) => (
              <div key={condition} className="checkbox-item">
                <input
                  type="checkbox"
                  id={condition}
                  checked={selectedConditions.includes(condition)}
                  onChange={() => handleCheckboxChange(condition)}
                />
                <label htmlFor={condition}>{condition}</label>
              </div>
            ))}
          </div>
          
          <button type="submit" className="btn">Continue</button>
        </form>
      </div>
    </div>
  );
}

export default PhysicalHealth;





