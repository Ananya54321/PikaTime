import React from 'react';
import type { PetState } from '../../types/Pet';
import { ACTION_COSTS } from '../../types/Pet';
import './ActionButtons.css';

interface ActionButtonsProps {
  petState: PetState;
  coins: number;
  onFeed: () => void;
  onPlay: () => void;
  onRest: () => void;
  onReset: () => void;
}

/**
 * ActionButtons component - Interactive buttons for pet actions
 */
export const ActionButtons: React.FC<ActionButtonsProps> = ({
  petState,
  coins,
  onFeed,
  onPlay,
  onRest,
  onReset
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
    <div className="action-buttons">
      {/* Coins Display */}
      <div className="coins-display">
        <span className="coins-icon">💰</span>
        <span className="coins-amount">{coins} coins</span>
      </div>

      <div className="action-buttons-grid">
        <button 
          className="action-button feed-button"
          onClick={onFeed}
          disabled={isFeedDisabled}
          title={isFeedDisabled ? getDisabledReason('feed') : `Feed your pet (${ACTION_COSTS.feed} coins)`}
        >
          <span className="button-icon">🍎</span>
          <span className="button-text">Feed</span>
          <span className="button-effect">+20 Hunger</span>
          <span className="button-cost">{ACTION_COSTS.feed} 💰</span>
        </button>

        <button 
          className="action-button play-button"
          onClick={onPlay}
          disabled={isPlayDisabled}
          title={isPlayDisabled ? getDisabledReason('play') : `Play with your pet (${ACTION_COSTS.play} coins)`}
        >
          <span className="button-icon">🎾</span>
          <span className="button-text">Play</span>
          <span className="button-effect">+15 Happiness</span>
          <span className="button-cost">{ACTION_COSTS.play} 💰</span>
        </button>

        <button 
          className="action-button rest-button"
          onClick={onRest}
          disabled={isRestDisabled}
          title={isRestDisabled ? getDisabledReason('rest') : `Let your pet rest (${ACTION_COSTS.rest} coins)`}
        >
          <span className="button-icon">💤</span>
          <span className="button-text">Rest</span>
          <span className="button-effect">+25 Energy</span>
          <span className="button-cost">{ACTION_COSTS.rest} 💰</span>
        </button>
      </div>

      <div className="utility-buttons">
        <button 
          className="reset-button"
          onClick={onReset}
          title="Reset pet to default state"
        >
          <span className="button-icon">🔄</span>
          Reset Pet
        </button>
      </div>

      <div className="action-tips">
        <p><strong>💡 How to earn coins:</strong></p>
        <ul>
          <li>🍎 <strong>Feed</strong> costs {ACTION_COSTS.feed} coins - increases hunger but makes your pet sleepy</li>
          <li>🎾 <strong>Play</strong> costs {ACTION_COSTS.play} coins - boosts happiness but uses energy and hunger</li>
          <li>💤 <strong>Rest</strong> costs {ACTION_COSTS.rest} coins - restores energy but decreases hunger slightly</li>
          <li>💼 <strong>Work sessions</strong> earn you coins to care for your pet!</li>
          <li>📉 Stats naturally decrease over time - check on your pet regularly!</li>
        </ul>
      </div>
    </div>
  );
};
