import React from 'react';
import type { PetState } from '../../types/Pet';
import './Pet.css';

interface PetProps {
  petState: PetState;
}

/**
 * Pet component - Visual representation of the virtual pet
 */
export const Pet: React.FC<PetProps> = ({ petState }) => {
  // Determine pet mood based on stats
  const getPetMood = (): string => {
    const avgStats = (petState.hunger + petState.happiness + petState.energy) / 3;
    
    if (avgStats >= 80) return 'excellent';
    if (avgStats >= 60) return 'good';
    if (avgStats >= 40) return 'okay';
    if (avgStats >= 20) return 'poor';
    return 'critical';
  };

  // Get pet emoji based on mood
  const getPetEmoji = (): string => {
    const mood = getPetMood();
    
    switch (mood) {
      case 'excellent': return '😊';
      case 'good': return '🙂';
      case 'okay': return '😐';
      case 'poor': return '😟';
      case 'critical': return '😢';
      default: return '🙂';
    }
  };

  // Get status message based on lowest stat
  const getStatusMessage = (): string => {
    const { hunger, happiness, energy } = petState;
    
    if (hunger <= 20) return `${petState.name} is very hungry!`;
    if (happiness <= 20) return `${petState.name} is feeling sad...`;
    if (energy <= 20) return `${petState.name} is exhausted!`;
    
    if (hunger >= 80 && happiness >= 80 && energy >= 80) {
      return `${petState.name} is feeling fantastic!`;
    }
    
    return `${petState.name} is doing okay.`;
  };

  const mood = getPetMood();

  return (
    <div className={`pet-container ${mood}`}>
      <div className="pet-avatar">
        <span className="pet-emoji">{getPetEmoji()}</span>
        <div className="pet-name">{petState.name}</div>
      </div>
      <div className="pet-status">
        <p className="status-message">{getStatusMessage()}</p>
      </div>
    </div>
  );
};
