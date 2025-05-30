import React, { useState } from 'react';
import type { ProductivityState, WorkSession } from '../../types/Pet';
import { COINS_PER_MINUTE, MIN_WORK_SESSION } from '../../types/Pet';
import './WorkTimer.css';

interface WorkTimerProps {
  productivityState: ProductivityState;
  onStartWork: (description: string) => void;
  onEndWork: () => void;
  onCancelWork: () => void;
  workStats: {
    todayWorkTime: number;
    todayCoins: number;
    todaySessions: number;
    totalWorkTime: number;
    totalCoins: number;
    totalSessions: number;
  };
}

/**
 * WorkTimer component - Manages work sessions and productivity tracking
 */
export const WorkTimer: React.FC<WorkTimerProps> = ({
  productivityState,
  onStartWork,
  onEndWork,
  onCancelWork,
  workStats
}) => {
  const [workDescription, setWorkDescription] = useState('');

  const { currentSession } = productivityState;

  // Format time display
  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  // Calculate estimated earnings for current session
  const getEstimatedEarnings = (): number => {
    if (!currentSession) return 0;
    return currentSession.duration >= MIN_WORK_SESSION ? currentSession.duration * COINS_PER_MINUTE : 0;
  };

  // Handle starting work session
  const handleStartWork = () => {
    if (workDescription.trim()) {
      onStartWork(workDescription.trim());
      setWorkDescription('');
    }
  };

  // Handle key press in input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && workDescription.trim()) {
      handleStartWork();
    }
  };

  return (
    <div className="work-timer">
      <div className="timer-header">
        <h3 className="timer-title">
          <span>💼</span>
          Work Timer
        </h3>
        <p className="timer-subtitle">Earn coins by tracking your work sessions</p>
      </div>

      {currentSession ? (
        // Active work session display
        <div>
          <div className="timer-display">
            <h2 className="timer-time">{formatTime(currentSession.duration)}</h2>
            <p className="timer-description">{currentSession.description}</p>
            <p className="timer-earnings">
              💰 Earned: {getEstimatedEarnings()} coins
              {currentSession.duration < MIN_WORK_SESSION && (
                <span> (minimum {MIN_WORK_SESSION} minutes required)</span>
              )}
            </p>
          </div>

          <div className="timer-buttons">
            <button className="timer-button stop-button" onClick={onEndWork}>
              <span>⏹️</span>
              Finish Work
            </button>
            <button className="timer-button cancel-button" onClick={onCancelWork}>
              <span>❌</span>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        // Start work session form
        <div className="timer-form">
          <input
            type="text"
            className="timer-input"
            placeholder="What are you working on?"
            value={workDescription}
            onChange={(e) => setWorkDescription(e.target.value)}
            onKeyPress={handleKeyPress}
            maxLength={100}
          />
          
          <div className="timer-buttons">
            <button 
              className="timer-button start-button"
              onClick={handleStartWork}
              disabled={!workDescription.trim()}
            >
              <span>▶️</span>
              Start Work
            </button>
          </div>
        </div>
      )}

      {/* Work Statistics */}
      <div className="timer-stats">
        <div className="stats-grid">
          <div className="stat-item">
            <p className="stat-value">{workStats.todayWorkTime}</p>
            <p className="stat-label">Today (min)</p>
          </div>
          <div className="stat-item">
            <p className="stat-value">{workStats.todayCoins}</p>
            <p className="stat-label">Today Coins</p>
          </div>
          <div className="stat-item">
            <p className="stat-value">{Math.floor(workStats.totalWorkTime / 60)}</p>
            <p className="stat-label">Total Hours</p>
          </div>
          <div className="stat-item">
            <p className="stat-value">{productivityState.coins}</p>
            <p className="stat-label">Total Coins</p>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="timer-tips">
        <p>Productivity Tips:</p>
        <ul>
          <li>Work for at least {MIN_WORK_SESSION} minutes to earn coins</li>
          <li>Earn {COINS_PER_MINUTE} coins per minute of work</li>
          <li>Use coins to take care of your pet</li>
          <li>Track different types of work sessions</li>
        </ul>
      </div>
    </div>
  );
};
