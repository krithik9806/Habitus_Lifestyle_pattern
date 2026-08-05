import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import PhysicalHealth from './pages/PhysicalHealth';
import MentalWellness from './pages/MentalWellness';
import DailyHabits from './pages/DailyHabits';
import Dashboard from './pages/Dashboard';
import { isAuthenticated, getCurrentUser } from './utils/auth';
import { getUserData } from './utils/storage';

function PrivateRoute({ children }) {
  try {
    return isAuthenticated() ? children : <Navigate to="/login" />;
  } catch (error) {
    return <Navigate to="/login" />;
  }
}

function PublicRoute({ children }) {
  // For login/signup pages, just show them if not authenticated
  // The redirect logic is handled in Login/Signup components after successful auth
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/physical-health"
          element={
            <PrivateRoute>
              <PhysicalHealth />
            </PrivateRoute>
          }
        />
        <Route
          path="/mental-wellness"
          element={
            <PrivateRoute>
              <MentalWellness />
            </PrivateRoute>
          }
        />
        <Route
          path="/daily-habits"
          element={
            <PrivateRoute>
              <DailyHabits />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

