import React from 'react';
import { FaDumbbell, FaRunning, FaWeightHanging } from 'react-icons/fa';
import { GiWeightLiftingUp } from 'react-icons/gi';
import '../styles/Workouts.css';

function Workouts() {
  return (
    <div className="programs-page">
      <div className="programs-header-container">
        <h2>Workout Programs</h2>
      </div>
      
      <div className="program-container">
        <FaDumbbell className="program-icon" />
        <h3>Dumbbell Workouts</h3>
      </div>

      <div className="program-container">
        <GiWeightLiftingUp className="program-icon" />
        <h3>Machine Workouts</h3>
      </div>

      <div className="program-container">
        <FaWeightHanging className="program-icon" />
        <h3>Barbell Workouts</h3>
      </div>

      <div className="program-container">
        <FaRunning className="program-icon" />
        <h3>Bodyweight Workouts</h3>
      </div>
    </div>
  );
}

export default Workouts;
