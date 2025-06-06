import React from 'react';
import type { PetState } from '../../types/Pet';
import { ACTION_COSTS } from '../../types/Pet';

interface ActionButtonsProps {
  petState: PetState;
  coins: number;
  onFeed: () => void;
  onPlay: () => void;
  onRest: () => void;
}

/**
 * ActionButtons component - Interactive buttons for pet actions
 */
export const ActionButtons: React.FC<ActionButtonsProps> = ({
  petState,
  coins,
  onFeed,
  onPlay,
  onRest
}) => {
  // Determine if action is disabled based on pet state or coins
  const isPlayDisabled = petState.energy < 10 || coins < ACTION_COSTS.play;
  const isFeedDisabled = petState.hunger >= 95 || coins < ACTION_COSTS.feed;
  const isRestDisabled = petState.energy >= 95 || coins < ACTION_COSTS.rest;

  // Get disabled reason for tooltip
  const getDisabledReason = (action: 'feed' | 'play' | 'rest'): string => {
    const cost = ACTION_COSTS[action];
    if (coins < cost) return `Need ${cost} coins!`;
    
    switch (action) {
      case 'feed':
        return petState.hunger >= 95 ? "Pet is too full!" : "";
      case 'play':
        return petState.energy < 10 ? "Pet is too tired to play!" : "";
      case 'rest':
        return petState.energy >= 95 ? "Pet is already well rested!" : "";
      default:
        return "";
    }
  };

  return (
    <div className="p-3 h-full flex flex-col relative">
      {/* Coins Display */}
      <div className="flex items-center justify-center gap-2 mb-3 p-2.5 bg-gradient-to-r from-yellow-400/15 to-yellow-300/15 border border-yellow-400/30 rounded-xl shadow-lg shadow-yellow-400/10 backdrop-blur-md">
        <span className="text-xl drop-shadow-lg">💰</span>
        <span className="text-lg font-black text-white/95 drop-shadow-sm tracking-tight">
          {coins} coins
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 flex-1">
        <button 
          className={`flex flex-col items-center justify-center p-2 border-none rounded-2xl cursor-pointer transition-all duration-300 ease-out font-sans shadow-lg shadow-black/15 relative overflow-hidden backdrop-blur-md border border-white/10 min-h-[80px] bg-gradient-to-br from-red-500/20 to-red-400/20 text-white/90 ${
            isFeedDisabled 
              ? 'opacity-40 cursor-not-allowed grayscale' 
              : 'hover:-translate-y-1 hover:shadow-xl hover:shadow-black/25 hover:border-white/20 active:-translate-y-0.5 active:shadow-lg active:shadow-black/20'
          }`}
          onClick={onFeed}
          disabled={isFeedDisabled}
          title={isFeedDisabled ? getDisabledReason('feed') : `Feed your pet (${ACTION_COSTS.feed} coins)`}
        >
          <span className="text-3xl mb-1 drop-shadow-md">🍎</span>
          <span className="font-bold text-base mb-1 tracking-tight">Feed</span>
          <span className="text-xs opacity-70 font-medium text-center leading-tight">+20 Hunger<br/> +5 Happiness<br/>-2 Energy</span>
          <span className="text-xs opacity-80 font-semibold mt-1 bg-black/20 py-1 px-2 rounded-lg backdrop-blur-sm">
            {ACTION_COSTS.feed} 💰
          </span>
        </button>

        <button 
          className={`flex flex-col items-center justify-center p-3 border-none rounded-2xl cursor-pointer transition-all duration-300 ease-out font-sans shadow-lg shadow-black/15 relative overflow-hidden backdrop-blur-md border border-white/10 min-h-[80px] bg-gradient-to-br from-blue-500/20 to-blue-400/20 text-white/90 ${
            isPlayDisabled 
              ? 'opacity-40 cursor-not-allowed grayscale' 
              : 'hover:-translate-y-1 hover:shadow-xl hover:shadow-black/25 hover:border-white/20 active:-translate-y-0.5 active:shadow-lg active:shadow-black/20'
          }`}
          onClick={onPlay}
          disabled={isPlayDisabled}
          title={isPlayDisabled ? getDisabledReason('play') : `Play with your pet (${ACTION_COSTS.play} coins)`}
        >
          <span className="text-3xl mb-2 drop-shadow-md">🎾</span>
          <span className="font-bold text-base mb-1 tracking-tight">Play</span>
          <span className="text-xs opacity-70 font-medium text-center leading-tight">+15 Happiness<br/>-10 Hunger<br/>-15 Energy</span>
          <span className="text-xs opacity-80 font-semibold mt-1 bg-black/20 py-1 px-2 rounded-lg backdrop-blur-sm">
            {ACTION_COSTS.play} 💰
          </span>
        </button>

        {/* Rest button - centered in second row */}
        <div className=" flex justify-center">
          <button 
            className={`flex flex-col items-center justify-center p-3 border-none rounded-2xl cursor-pointer transition-all duration-300 ease-out font-sans shadow-lg shadow-black/15 relative overflow-hidden backdrop-blur-md border border-white/10 min-h-[80px] bg-gradient-to-br from-green-500/20 to-green-400/20 text-white/90 w-full max-w-[180px] ${
              isRestDisabled 
                ? 'opacity-40 cursor-not-allowed grayscale' 
                : 'hover:-translate-y-1 hover:shadow-xl hover:shadow-black/25 hover:border-white/20 active:-translate-y-0.5 active:shadow-lg active:shadow-black/20'
            }`}
            onClick={onRest}
            disabled={isRestDisabled}
            title={isRestDisabled ? getDisabledReason('rest') : `Let your pet rest (${ACTION_COSTS.rest} coins)`}
          >
            <span className="text-3xl mb-2 drop-shadow-md">💤</span>
            <span className="font-bold text-base mb-1 tracking-tight">Rest</span>
            <span className="text-xs opacity-70 font-medium text-center leading-tight">+25 Energy<br/> +5 Happiness<br/>-5 Hunger</span>
            <span className="text-xs opacity-80 font-semibold mt-1 bg-black/20 py-1 px-2 rounded-lg backdrop-blur-sm">
              {ACTION_COSTS.rest} 💰
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
