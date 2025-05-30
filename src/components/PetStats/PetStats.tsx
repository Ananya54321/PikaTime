import React from 'react';
import type { PetState } from '../../types/Pet';

interface PetStatsProps {
  petState: PetState;
}

/**
 * PetStats component - Displays pet's current statistics with progress bars
 */
export const PetStats: React.FC<PetStatsProps> = ({ petState }) => {
  // Get color classes based on stat value
  const getStatColor = (value: number): string => {
    if (value >= 80) return 'bg-gradient-to-r from-green-400 to-green-500 shadow-green-400/40';
    if (value >= 60) return 'bg-gradient-to-r from-lime-400 to-green-400 shadow-lime-400/40';
    if (value >= 40) return 'bg-gradient-to-r from-orange-400 to-orange-500 shadow-orange-400/40';
    if (value >= 20) return 'bg-gradient-to-r from-red-400 to-orange-500 shadow-red-400/40';
    return 'bg-gradient-to-r from-red-500 to-red-600 shadow-red-500/40';
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
    <div className="flex flex-col gap-2" key={statType}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xl mr-2 drop-shadow-sm">{getStatIcon(statType)}</span>
        <span className="flex-1 font-semibold text-white/80 text-sm uppercase tracking-wider">
          {label}
        </span>
        <span className="font-bold text-white/95 text-lg min-w-[50px] text-right">
          {Math.round(value)}%
        </span>
      </div>
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm shadow-inner">
        <div 
          className={`h-full rounded-full transition-all duration-500 ease-out relative shadow-lg ${getStatColor(value)}`}
          style={{ width: `${value}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/40 to-white/20 rounded-full" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 h-full flex flex-col relative">
      <h3 className="text-center m-0 mb-4 text-white/90 text-xl font-bold tracking-tight">
        Pet Status
      </h3>
      <div className="flex flex-col gap-4 flex-1">
        {renderStatBar('Hunger', petState.hunger, 'hunger')}
        {renderStatBar('Happiness', petState.happiness, 'happiness')}
        {renderStatBar('Energy', petState.energy, 'energy')}
      </div>
      <div className="mt-auto pt-6 text-center text-sm text-white/50 border-t border-white/10">
        Last checked: {new Date(petState.lastUpdated).toLocaleTimeString()}
      </div>
    </div>
  );
};
