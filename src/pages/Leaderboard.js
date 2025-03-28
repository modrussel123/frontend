import React, { useState, useEffect } from 'react';
import { FaWeight, FaDumbbell, FaCalendarCheck, FaSync, FaCrown, FaEnvelope, FaUser } from 'react-icons/fa';
import axios from 'axios';
import '../styles/Leaderboard.css';

const API_URL = process.env.REACT_APP_BACKEND_URL;

function Leaderboard() {
  const [activeCategory, setActiveCategory] = useState('weightLoss');
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  const categories = [
    { id: 'weightLoss', name: 'Weight Loss', icon: <FaWeight /> },
    { id: 'strength', name: 'Strength-Based', icon: <FaDumbbell /> },
    { id: 'consistency', name: 'Consistency', icon: <FaCalendarCheck /> },
    { id: 'hybrid', name: 'Hybrid', icon: <FaSync /> }
  ];

  useEffect(() => {
    if (activeCategory === 'weightLoss' || 
        activeCategory === 'strength' || 
        activeCategory === 'consistency' || 
        activeCategory === 'hybrid') {
        fetchLeaderboardData();
    }
  }, [activeCategory]);

  const fetchLeaderboardData = async () => {
    try {
      setLoading(true);
      const endpoint = activeCategory === 'weightLoss' 
          ? 'weight-loss' 
          : activeCategory === 'strength' 
          ? 'strength'
          : activeCategory === 'consistency'
          ? 'consistency'
          : activeCategory === 'hybrid'
          ? 'hybrid'
          : null;

      if (!endpoint) {
          setLeaderboardData([]);
          return;
      }

      const response = await axios.get(`${API_URL}api/leaderboard/${endpoint}`);
      setLeaderboardData(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch leaderboard data');
      console.error('Leaderboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderRankInfo = (user, category) => {
    if (category === 'hybrid') {
        return (
            <div className="hybrid-info">
                <div className="hybrid-stats">
                    <div className="volume-stats">
                        <div className="total-volume">
                            Total Volume <span>{(user.totalVolume || 0).toLocaleString()}</span>
                        </div>
                        <div className="total-workouts">
                            Workouts <span>{user.totalWorkouts || 0}</span>
                        </div>
                    </div>
                    <div className="consistency-stats">
                        <div className="active-days">
                            Active Days <span>{user.activeDays || 0}</span>
                        </div>
                        <div className="hybrid-score">
                            {(user.hybridScore || 0).toLocaleString()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) return null;

    if (category === 'weightLoss') {
        return (
            <div className="weight-info">
                <div className="weight-details">
                    <div className="weight-stat">
                        <span>Start:</span> <span>{user.startingWeight?.toFixed(1)} kg</span>
                    </div>
                    <div className="weight-stat">
                        <span>Current:</span> <span>{user.currentWeight?.toFixed(1)} kg</span>
                    </div>
                    <div className="weight-stat">
                        <span>Loss:</span> <span>{user.weightLoss?.toFixed(1)} kg</span>
                    </div>
                    {user.consistencyBonus > 0 && (
                        <div className="bonus-details">
                            <span className="bonus-tag">
                                +{(user.consistencyBonus * 100).toFixed(0)}% bonus
                            </span>
                            <span className="weigh-ins">
                                ({user.weighInDays} days)
                            </span>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    if (category === 'strength') {
        return (
            <div className="strength-info">
                <div className="strength-stats">
                    <div className="total-volume">
                        Total Volume <span>{(user.totalVolume || 0).toLocaleString()}</span>
                    </div>
                    <div className="total-workouts">
                        Workouts <span>{user.workoutCount || 0}</span>
                    </div>
                    <div className="strength-score">
                        {(user.strengthScore || 0).toLocaleString()}
                    </div>
                </div>
            </div>
        );
    }

    if (category === 'consistency') {
        return (
            <div className="consistency-info">
                <div className="consistency-stats">
                    <div className="total-workouts">
                        Total Workouts: <span>{user.totalWorkouts || 0}</span>
                    </div>
                    <div className="active-days">
                        Active Days: <span>{user.activeDays || 0}</span>
                    </div>
                    <div className="consistency-score">
                        Score: {(user.consistencyScore || 0).toLocaleString()}
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

const renderProfilePicture = (user) => {
    return (
        <div className="leaderboard-profile-container">
            {user.profilePicture ? (
                <img 
                    src={user.profilePicture} 
                    alt="Profile" 
                    className="leaderboard-profile-picture"
                />
            ) : (
                <div className="profile-placeholder">
                    <FaUser />
                </div>
            )}
        </div>
    );
};

const renderMedal = (rank) => {
    switch (rank) {
        case 0:
            return <div className="crown">👑</div>;
        case 1:
            return <div className="medal silver">🥈</div>;
        case 2:
            return <div className="medal bronze">🥉</div>;
        default:
            return null;
    }
};

const renderLeaderboardContent = () => {
    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!leaderboardData || leaderboardData.length === 0) {
        return <div className="no-data">No rankings available yet</div>;
    }

    return (
        <>
            <div className="top-performers mobile-performers">
                {leaderboardData.slice(0, 3).map((user, index) => (
                    <div key={user._id || index} className={`performer ${['first', 'second', 'third'][index]}`}>
                        {renderMedal(index)}
                        {renderProfilePicture(user)}
                        <div className="rank">{index + 1}</div>
                        <div className="name">{user.firstName} {user.lastName}</div>
                        <div className="email">
                            <FaEnvelope className="email-icon" />
                            {user.email}
                        </div>
                        {renderRankInfo(user, activeCategory)}
                    </div>
                ))}
            </div>
            <div className="other-ranks">
                {leaderboardData.slice(3).map((user, index) => (
                    <div key={user._id || index + 3} className="rank-item">
                        <div className="rank-number">{index + 4}</div>
                        {renderProfilePicture(user)}
                        <div className="rank-info">
                            <div className="rank-name">{user.firstName} {user.lastName}</div>
                            <div className="rank-email">
                                <FaEnvelope className="email-icon" />
                                {user.email}
                            </div>
                        </div>
                        {renderRankInfo(user, activeCategory)}
                    </div>
                ))}
            </div>
        </>
    );
};

  return (
    <div className="leaderboard-page">
      <div className="leaderboard-wrapper"> {/* Add this wrapper */}
        <div className="leaderboard-container">
          <div className="leaderboard-header">
            <h2>Leaderboard Rankings</h2>
          </div>
          
          <div className="category-tabs">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.icon}
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          {!user && (
            <div className="auth-message">
              <p>Sign in to see your rank and compete with others!</p>
              <button onClick={() => window.location.href = '/signin'} className="signin-btn">
                Sign In
              </button>
            </div>
          )}

          <div className="leaderboard-content">
            {renderLeaderboardContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
