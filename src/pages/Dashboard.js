import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../utils/auth';
import { getCurrentUserData } from '../utils/storage';
import '../styles/dashboard.css';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate('/login');
      return;
    }

    const data = getCurrentUserData();
    if (!data || !data.dailyHabits) {
      navigate('/daily-habits');
      return;
    }

    setUserData(data);
  }, [navigate]);

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  const generateRecommendations = () => {
    if (!userData) return [];

    const recommendations = [];
    const { dailyHabits, physicalHealth = [], mentalWellness = [] } = userData;

    // Water intake recommendations
    const recommendedWater = 2.5; // liters
    if (dailyHabits.waterIntake < recommendedWater) {
      recommendations.push({
        type: 'Hydration',
        title: 'Increase Water Intake',
        message: `You're currently drinking ${dailyHabits.waterIntake}L per day. Aim for ${recommendedWater}L daily to stay properly hydrated. Try setting hourly reminders or keeping a water bottle nearby.`,
        icon: '💧'
      });
    } else if (dailyHabits.waterIntake >= recommendedWater) {
      recommendations.push({
        type: 'Hydration',
        title: 'Great Hydration!',
        message: `You're maintaining excellent hydration with ${dailyHabits.waterIntake}L per day. Keep up the good work!`,
        icon: '💧'
      });
    }

    // Sleep recommendations
    const recommendedSleep = 7;
    if (dailyHabits.sleepHours < 6) {
      recommendations.push({
        type: 'Sleep',
        title: 'Improve Sleep Duration',
        message: `You're getting ${dailyHabits.sleepHours} hours of sleep. Aim for 7-9 hours for optimal health. Try establishing a consistent bedtime routine and limiting screen time before bed.`,
        icon: '😴'
      });
    } else if (dailyHabits.sleepHours < recommendedSleep) {
      recommendations.push({
        type: 'Sleep',
        title: 'Enhance Sleep Quality',
        message: `You're getting ${dailyHabits.sleepHours} hours of sleep. Try to reach 7-9 hours for better recovery and energy levels.`,
        icon: '😴'
      });
    } else {
      recommendations.push({
        type: 'Sleep',
        title: 'Excellent Sleep Pattern',
        message: `You're maintaining a healthy sleep schedule with ${dailyHabits.sleepHours} hours. This supports your overall wellness!`,
        icon: '😴'
      });
    }

    // Energy level recommendations
    if (dailyHabits.energyLevel < 5) {
      recommendations.push({
        type: 'Energy',
        title: 'Boost Your Energy',
        message: `Your energy level is ${dailyHabits.energyLevel}/10. Consider light exercise, balanced meals, and regular breaks throughout the day. Small walks can significantly improve energy.`,
        icon: '⚡'
      });
    } else if (dailyHabits.energyLevel < 7) {
      recommendations.push({
        type: 'Energy',
        title: 'Maintain Energy Levels',
        message: `Your energy is at ${dailyHabits.energyLevel}/10. Keep up with regular exercise and balanced nutrition to maintain and improve your energy.`,
        icon: '⚡'
      });
    }

    // Physical health recommendations
    if (physicalHealth.includes('Vitamin D3 Efficiency')) {
      recommendations.push({
        type: 'Immunity',
        title: 'Vitamin D3 Support',
        message: 'Consider spending 15-20 minutes in morning sunlight daily. Include vitamin D-rich foods like fatty fish, egg yolks, and fortified foods in your diet.',
        icon: '☀️'
      });
    }

    if (physicalHealth.includes('Low Haemoglobin')) {
      recommendations.push({
        type: 'Immunity',
        title: 'Iron-Rich Diet',
        message: 'Include iron-rich foods like leafy greens, legumes, and lean meats. Pair with vitamin C sources to enhance absorption. Consider consulting a healthcare provider.',
        icon: '🩸'
      });
    }

    if (physicalHealth.includes('Diabetes')) {
      recommendations.push({
        type: 'Immunity',
        title: 'Blood Sugar Management',
        message: 'Maintain regular meal times, include fiber-rich foods, and monitor your carbohydrate intake. Regular physical activity helps manage blood sugar levels effectively.',
        icon: '🩺'
      });
    }

    if (physicalHealth.includes('High Blood Pressure')) {
      recommendations.push({
        type: 'Immunity',
        title: 'Heart Health',
        message: 'Reduce sodium intake, include potassium-rich foods like bananas and spinach, and engage in regular moderate exercise. Stress management is also crucial.',
        icon: '❤️'
      });
    }

    // Mental wellness recommendations
    if (mentalWellness.includes('Stress')) {
      recommendations.push({
        type: 'Stress Management',
        title: 'Stress Relief Techniques',
        message: 'Practice deep breathing exercises, try 10-minute meditation sessions, or take short breaks for walks. Journaling can also help identify and manage stress triggers.',
        icon: '🧘'
      });
    }

    if (mentalWellness.includes('Anxiety')) {
      recommendations.push({
        type: 'Stress Management',
        title: 'Anxiety Management',
        message: 'Practice grounding techniques like the 5-4-3-2-1 method. Regular exercise and maintaining a consistent routine can help reduce anxiety levels.',
        icon: '🌿'
      });
    }

    if (mentalWellness.includes('Burnout')) {
      recommendations.push({
        type: 'Stress Management',
        title: 'Prevent Burnout',
        message: 'Set clear boundaries between work and personal time. Take regular breaks, prioritize self-care activities, and don\'t hesitate to delegate tasks when possible.',
        icon: '🔄'
      });
    }

    if (mentalWellness.includes('Depression')) {
      recommendations.push({
        type: 'Stress Management',
        title: 'Mental Health Support',
        message: 'Maintain social connections, engage in activities you enjoy, and consider speaking with a mental health professional. Small daily routines can provide structure and stability.',
        icon: '💙'
      });
    }

    if (mentalWellness.includes('Sleep Issues')) {
      recommendations.push({
        type: 'Sleep Improvement',
        title: 'Better Sleep Habits',
        message: 'Create a relaxing bedtime routine, keep your bedroom cool and dark, avoid caffeine in the afternoon, and try to go to bed and wake up at the same time daily.',
        icon: '🌙'
      });
    }

    // Limit to 4 recommendations
    return recommendations.slice(0, 4);
  };

  if (!userData) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  const { dailyHabits, profile } = userData;
  const recommendations = generateRecommendations();

  const getHydrationStatus = () => {
    if (dailyHabits.waterIntake >= 2.5) return { status: 'Excellent', color: '#4CAF50' };
    if (dailyHabits.waterIntake >= 1.5) return { status: 'Good', color: '#FF9800' };
    return { status: 'Low', color: '#F44336' };
  };

  const getSleepStatus = () => {
    if (dailyHabits.sleepHours >= 7) return { status: 'Optimal', color: '#4CAF50' };
    if (dailyHabits.sleepHours >= 6) return { status: 'Fair', color: '#FF9800' };
    return { status: 'Insufficient', color: '#F44336' };
  };

  const getEnergyStatus = () => {
    if (dailyHabits.energyLevel >= 7) return { status: 'High', color: '#4CAF50' };
    if (dailyHabits.energyLevel >= 5) return { status: 'Moderate', color: '#FF9800' };
    return { status: 'Low', color: '#F44336' };
  };

  const hydrationStatus = getHydrationStatus();
  const sleepStatus = getSleepStatus();
  const energyStatus = getEnergyStatus();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome back, {profile?.name || 'User'}!</h1>
        <button onClick={handleSignOut} className="signout-btn">Sign Out</button>
      </header>

      <div className="dashboard-content">
        <section className="wellness-snapshot">
          <h2>Your Wellness Snapshot</h2>
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon">😴</div>
              <h3>Sleep Hours</h3>
              <div className="metric-value">{dailyHabits.sleepHours} hrs</div>
              <div className="metric-status" style={{ color: sleepStatus.color }}>
                {sleepStatus.status}
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon">💧</div>
              <h3>Hydration</h3>
              <div className="metric-value">{dailyHabits.waterIntake}L</div>
              <div className="metric-status" style={{ color: hydrationStatus.color }}>
                {hydrationStatus.status}
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon">⚡</div>
              <h3>Energy Level</h3>
              <div className="metric-value">{dailyHabits.energyLevel}/10</div>
              <div className="metric-status" style={{ color: energyStatus.color }}>
                {energyStatus.status}
              </div>
            </div>
          </div>
        </section>

        <section className="recommendations-section">
          <h2>Personalized Recommendations</h2>
          <div className="recommendations-grid">
            {recommendations.map((rec, index) => (
              <div key={index} className="recommendation-card">
                <div className="recommendation-icon">{rec.icon}</div>
                <div className="recommendation-type">{rec.type}</div>
                <h3>{rec.title}</h3>
                <p>{rec.message}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;

