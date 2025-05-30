import { useState, useEffect, useCallback } from 'react';
import type { ProductivityState, WorkSession } from '../types/Pet';
import { COINS_PER_MINUTE, MIN_WORK_SESSION } from '../types/Pet';
import { loadProductivityState, saveProductivityState } from '../utils/localStorage';

/**
 * Custom hook for managing productivity and work session state
 */
export const useProductivityState = () => {
  const [productivityState, setProductivityState] = useState<ProductivityState>(loadProductivityState);

  // Start a new work session
  const startWorkSession = useCallback((description: string) => {
    const newSession: WorkSession = {
      id: Date.now().toString(),
      startTime: Date.now(),
      duration: 0,
      description,
      coinsEarned: 0,
      completed: false
    };

    setProductivityState(prevState => {
      const newState = {
        ...prevState,
        currentSession: newSession
      };
      saveProductivityState(newState);
      return newState;
    });
  }, []);

  // End the current work session
  const endWorkSession = useCallback(() => {
    setProductivityState(prevState => {
      if (!prevState.currentSession) return prevState;

      const session = prevState.currentSession;
      const endTime = Date.now();
      const duration = Math.floor((endTime - session.startTime) / (1000 * 60)); // minutes
      const coinsEarned = duration >= MIN_WORK_SESSION ? duration * COINS_PER_MINUTE : 0;

      const completedSession: WorkSession = {
        ...session,
        endTime,
        duration,
        coinsEarned,
        completed: true
      };

      const newState = {
        ...prevState,
        coins: prevState.coins + coinsEarned,
        totalWorkTime: prevState.totalWorkTime + duration,
        totalSessions: prevState.totalSessions + 1,
        currentSession: null,
        workHistory: [completedSession, ...prevState.workHistory].slice(0, 50), // Keep last 50 sessions
        lastWorkDate: Date.now()
      };

      saveProductivityState(newState);
      return newState;
    });
  }, []);

  // Cancel the current work session
  const cancelWorkSession = useCallback(() => {
    setProductivityState(prevState => {
      const newState = {
        ...prevState,
        currentSession: null
      };
      saveProductivityState(newState);
      return newState;
    });
  }, []);

  // Spend coins for pet actions
  const spendCoins = useCallback((amount: number): boolean => {
    if (productivityState.coins >= amount) {
      setProductivityState(prevState => {
        const newState = {
          ...prevState,
          coins: prevState.coins - amount
        };
        saveProductivityState(newState);
        return newState;
      });
      return true;
    }
    return false;
  }, [productivityState.coins]);

  // Update current session duration (for display purposes)
  useEffect(() => {
    if (!productivityState.currentSession) return;

    const interval = setInterval(() => {
      setProductivityState(prevState => {
        if (!prevState.currentSession) return prevState;

        const now = Date.now();
        const duration = Math.floor((now - prevState.currentSession.startTime) / (1000 * 60));
        
        return {
          ...prevState,
          currentSession: {
            ...prevState.currentSession,
            duration
          }
        };
      });
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [productivityState.currentSession]);

  // Get work statistics
  const getWorkStats = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStart = today.getTime();

    const todaySessions = productivityState.workHistory.filter(
      session => session.startTime >= todayStart
    );

    const todayWorkTime = todaySessions.reduce((total, session) => total + session.duration, 0);
    const todayCoins = todaySessions.reduce((total, session) => total + session.coinsEarned, 0);

    return {
      todayWorkTime,
      todayCoins,
      todaySessions: todaySessions.length,
      totalWorkTime: productivityState.totalWorkTime,
      totalCoins: productivityState.coins,
      totalSessions: productivityState.totalSessions
    };
  }, [productivityState]);

  return {
    productivityState,
    actions: {
      startWorkSession,
      endWorkSession,
      cancelWorkSession,
      spendCoins
    },
    getWorkStats
  };
};
