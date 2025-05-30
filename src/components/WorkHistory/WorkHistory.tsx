import React, { useState } from 'react';
import type { WorkSession } from '../../types/Pet';
import './WorkHistory.css';

interface WorkHistoryProps {
  workHistory: WorkSession[];
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
 * WorkHistory component - Displays work session history and statistics
 */
export const WorkHistory: React.FC<WorkHistoryProps> = ({
  workHistory,
  workStats
}) => {
  const [showHistory, setShowHistory] = useState(false);

  // Format date display
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const now = new Date();
    
    // Check if it's today
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // Check if it's yesterday
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Otherwise show date
    return date.toLocaleDateString([], { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Format duration display
  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="work-history">
      <div className="history-header">
        <span>📊</span>
        <h3 className="history-title">Work Statistics</h3>
      </div>

      {/* Summary Statistics */}
      <div className="history-summary">
        <div className="summary-stats">
          <div className="summary-stat">
            <p className="summary-value">{workStats.todaySessions}</p>
            <p className="summary-label">Today</p>
          </div>
          <div className="summary-stat">
            <p className="summary-value">{formatDuration(workStats.todayWorkTime)}</p>
            <p className="summary-label">Today Time</p>
          </div>
          <div className="summary-stat">
            <p className="summary-value">{workStats.totalSessions}</p>
            <p className="summary-label">Total Sessions</p>
          </div>
          <div className="summary-stat">
            <p className="summary-value">{Math.floor(workStats.totalWorkTime / 60)}h</p>
            <p className="summary-label">Total Time</p>
          </div>
        </div>

        <button 
          className="toggle-button"
          onClick={() => setShowHistory(!showHistory)}
        >
          {showHistory ? 'Hide History' : 'Show History'}
        </button>
      </div>

      {/* Work History List */}
      {showHistory && (
        <div className="history-list">
          {workHistory.length === 0 ? (
            <div className="history-empty">
              <p>No work sessions yet!</p>
              <p>Start your first work session to see it here.</p>
            </div>
          ) : (
            workHistory.map((session) => (
              <div key={session.id} className="history-item">
                <div className="session-header">
                  <p className="session-description">{session.description}</p>
                  <span className="session-coins">💰 {session.coinsEarned}</span>
                </div>
                <div className="session-details">
                  <span className="session-duration">
                    <span>⏱️</span>
                    {formatDuration(session.duration)}
                  </span>
                  <span className="session-date">
                    {formatDate(session.startTime)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
