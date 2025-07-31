import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import CheckInPage from './pages/CheckInPage';
import UserProfile from './pages/UserProfile';
import GymProfile from './pages/GymProfile';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen-safe bg-gray-50">
        <Navbar />
        <main className="h-full">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/checkin" element={<CheckInPage />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/gym/:id" element={<GymProfile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
