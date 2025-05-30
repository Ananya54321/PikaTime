import React from 'react';
import type { PetState } from '../../types/Pet';
import './PetStats.css';

interface PetStatsProps {
  petState: PetState;
}

/**
 * PetStats component - Displays pet's current statistics with progress bars
 */
export const PetStats: React.FC<PetStatsProps> = ({ petState }) => {
  // Get color based on stat value
  const getStatColor = (value: number): string => {
    if (value >= 80) return '#4caf50'; // green
    if (value >= 60) return '#8bc34a'; // light green
    if (value >= 40) return '#ff9800'; // orange
    if (value >= 20) return '#ff5722'; // red-orange
    return '#f44336'; // red
  };

  // Get stat icon
  const getStatIcon = (statType: 'hunger' | 'happiness' | 'energy'): string => {
    switch (statType) {
      case 'hunger': return '🍎';
      case 'happiness': return '😊';
      case 'energy': return '⚡';
      default: return '📊';
    }
  };

  // Render individual stat bar
  const renderStatBar = (
    label: string,
    value: number,
    statType: 'hunger' | 'happiness' | 'energy'
  ) => (
    <div className="stat-item" key={statType}>
      <div className="stat-header">
        <span className="stat-icon">{getStatIcon(statType)}</span>
        <span className="stat-label">{label}</span>
        <span className="stat-value">{Math.round(value)}%</span>
      </div>
      <div className="stat-bar-container">
        <div 
          className="stat-bar-fill"
          style={{
            width: `${value}%`,
            backgroundColor: getStatColor(value)
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="pet-stats">
      <h3 className="stats-title">Pet Status</h3>
      <div className="stats-container">
        {renderStatBar('Hunger', petState.hunger, 'hunger')}
        {renderStatBar('Happiness', petState.happiness, 'happiness')}
        {renderStatBar('Energy', petState.energy, 'energy')}
      </div>
      <div className="last-updated">
        Last checked: {new Date(petState.lastUpdated).toLocaleTimeString()}
      </div>
    </div>
  );
};
