import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import SignOut from './pages/Signout';  
import Workouts from './pages/Workouts';
import MyWorkout from './pages/MyWorkout';
import Leaderboard from './pages/Leaderboard';
import Achievements from './pages/Achievements';
import WorkoutSchedule from './pages/WorkoutSchedule';
import Profile from './pages/Profile';
import Friends from './pages/Friends';
import WeightTracking from './pages/WeightTracking';

import Header from './components/Header';
import Footer from './components/Footer';

import './styles/App.css'; 

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signout" element={<SignOut />} />  {}
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/my-workout" element={<MyWorkout />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/schedule" element={<WorkoutSchedule />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/weight-tracking" element={<WeightTracking />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
