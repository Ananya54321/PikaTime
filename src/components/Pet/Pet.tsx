import React from 'react';
import type { PetState } from '../../types/Pet';

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
  
  // Get mood-specific styles
  const getMoodStyles = () => {
    switch (mood) {
      case 'excellent':
        return 'bg-gradient-to-br from-teal-400/20 to-teal-600/20';
      case 'good':
        return 'bg-gradient-to-br from-blue-400/20 to-purple-500/20';
      case 'okay':
        return 'bg-gradient-to-br from-pink-400/20 to-rose-500/20';
      case 'poor':
        return 'bg-gradient-to-br from-orange-200/20 to-orange-400/20';
      case 'critical':
        return 'bg-gradient-to-br from-red-300/20 to-pink-300/20 animate-pulse-slow';
      default:
        return 'bg-gradient-to-br from-blue-400/20 to-purple-500/20';
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center p-6 h-full w-full rounded-2xl transition-all duration-300 bg-transparent relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:rounded-2xl before:pointer-events-none ${getMoodStyles()}`}>

      <div className="flex flex-col items-center mb-4 z-10 relative">
        <span className="text-6xl md:text-7xl mb-3 transition-transform duration-300 cursor-pointer drop-shadow-lg hover:scale-110 hover:rotate-6">
          {getPetEmoji()}
        </span>
        <div className="text-2xl font-bold text-white drop-shadow-md mb-4 tracking-tight">
          {petState.name}
        </div>
      </div>
      <div className="text-center z-10 relative w-full">
        <p className="text-white text-base m-0 drop-shadow-sm bg-black/20 py-3 px-5 rounded-2xl backdrop-blur-md border border-white/10 font-medium">
          {getStatusMessage()}
        </p>
      </div>
    </div>
  );
};
