import { useState, useEffect, useCallback } from 'react';
import type { PetState } from '../types/Pet';
import { ACTION_EFFECTS, STAT_LIMITS, DECAY_RATE, ACTION_COSTS } from '../types/Pet';
import { loadPetState, savePetState } from '../utils/localStorage';

/**
 * Custom hook for managing virtual pet state
 */
export const usePetState = (spendCoins: (amount: number) => boolean) => {
  const [petState, setPetState] = useState<PetState>(loadPetState);

  // Clamp values between min and max
  const clampValue = (value: number): number => {
    return Math.max(STAT_LIMITS.MIN, Math.min(STAT_LIMITS.MAX, value));
  };

  // Apply time-based decay to stats
  const applyDecay = useCallback((currentState: PetState): PetState => {
    const now = Date.now();
    const timeDiff = (now - currentState.lastUpdated) / (1000 * 60); // minutes elapsed
    
    if (timeDiff < 1) return currentState; // No decay if less than a minute

    const decayAmount = Math.floor(timeDiff);
    
    return {
      ...currentState,
      hunger: clampValue(currentState.hunger - (DECAY_RATE.HUNGER * decayAmount)),
      happiness: clampValue(currentState.happiness - (DECAY_RATE.HAPPINESS * decayAmount)),
      energy: clampValue(currentState.energy - (DECAY_RATE.ENERGY * decayAmount)),
      lastUpdated: now
    };
  }, []);

  // Feed the pet
  const feed = useCallback(() => {
    if (!spendCoins(ACTION_COSTS.feed)) return;
    
    setPetState(currentState => {
      const decayedState = applyDecay(currentState);
      const newState = {
        ...decayedState,
        hunger: clampValue(decayedState.hunger + ACTION_EFFECTS.FEED.hunger),
        happiness: clampValue(decayedState.happiness + ACTION_EFFECTS.FEED.happiness),
        energy: clampValue(decayedState.energy + ACTION_EFFECTS.FEED.energy),
        lastUpdated: Date.now()
      };
      savePetState(newState);
      return newState;
    });
  }, [applyDecay, spendCoins]);

  // Play with the pet
  const play = useCallback(() => {
    if (!spendCoins(ACTION_COSTS.play)) return;
    
    setPetState(currentState => {
      const decayedState = applyDecay(currentState);
      const newState = {
        ...decayedState,
        hunger: clampValue(decayedState.hunger + ACTION_EFFECTS.PLAY.hunger),
        happiness: clampValue(decayedState.happiness + ACTION_EFFECTS.PLAY.happiness),
        energy: clampValue(decayedState.energy + ACTION_EFFECTS.PLAY.energy),
        lastUpdated: Date.now()
      };
      savePetState(newState);
      return newState;
    });
  }, [applyDecay, spendCoins]);

  // Let the pet rest
  const rest = useCallback(() => {
    if (!spendCoins(ACTION_COSTS.rest)) return;
    
    setPetState(currentState => {
      const decayedState = applyDecay(currentState);
      const newState = {
        ...decayedState,
        hunger: clampValue(decayedState.hunger + ACTION_EFFECTS.REST.hunger),
        happiness: clampValue(decayedState.happiness + ACTION_EFFECTS.REST.happiness),
        energy: clampValue(decayedState.energy + ACTION_EFFECTS.REST.energy),
        lastUpdated: Date.now()
      };
      savePetState(newState);
      return newState;
    });
  }, [applyDecay, spendCoins]);

  // Reset pet to initial state
  const resetPet = useCallback(() => {
    const initialState = {
      name: 'Buddy',
      hunger: 50,
      happiness: 50,
      energy: 50,
      lastUpdated: Date.now()
    };
    setPetState(initialState);
    savePetState(initialState);
  }, []);

  // Apply decay on component mount and set up interval
  useEffect(() => {
    setPetState(currentState => {
      const decayedState = applyDecay(currentState);
      if (decayedState !== currentState) {
        savePetState(decayedState);
      }
      return decayedState;
    });

    // Set up interval to apply decay every minute
    const interval = setInterval(() => {
      setPetState(currentState => {
        const decayedState = applyDecay(currentState);
        if (decayedState !== currentState) {
          savePetState(decayedState);
        }
        return decayedState;
      });
    }, 60000); // 1 minute

    return () => clearInterval(interval);
  }, [applyDecay]);

  return {
    petState,
    actions: {
      feed,
      play,
      rest,
      resetPet
    }
  };
};
