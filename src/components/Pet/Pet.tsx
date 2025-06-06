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

  // Get pet image based on mood
  const getPetImage = (): string => {
    const mood = getPetMood();
    switch (mood) {
      case 'excellent': return '/excellent.png';
      case 'good': return '/good.png';
      case 'okay': return '/okay.png';
      case 'poor': return '/poor.png';
      case 'critical': return '/critical.png';
      default: return '/good.png';
    }
  };

  // Get status message based on lowest stat
  const getStatusMessage = (): string => {
    const { hunger, happiness, energy } = petState;
    
    if (hunger <= 20) return `Pikachu is very hungry!`;
    if (happiness <= 20) return `Pikachu is feeling sad...`;
    if (energy <= 20) return `Pikachu is exhausted!`;

    if (hunger >= 80 && happiness >= 80 && energy >= 80) {
      return `Pikachu is feeling fantastic!`;
    }

    return `Pikachu is doing okay.`;
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

        <img 
          src={getPetImage()} 
          alt={`Pet is feeling ${getPetMood()}`}
          className="w-24 h-24 md:w-64 md:h-64 mb-3 transition-transform duration-300 cursor-pointer drop-shadow-lg hover:scale-110 hover:rotate-6 object-contain"
        />
      <div className="text-center z-10 relative w-full">
        <p className="text-white text-base m-0 drop-shadow-sm bg-black/20 py-3 px-5 rounded-2xl backdrop-blur-md border border-white/10 font-medium">
          {getStatusMessage()}
        </p>
      </div>
    </div>
  );
};
