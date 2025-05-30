// Pet type definitions
export interface PetState {
  name: string;
  hunger: number; // 0-100 (0 = starving, 100 = full)
  happiness: number; // 0-100 (0 = very sad, 100 = very happy)
  energy: number; // 0-100 (0 = exhausted, 100 = fully energized)
  lastUpdated: number; // timestamp for time-based stat decay
}

export interface PetAction {
  type: 'feed' | 'play' | 'rest';
  amount: number;
}

// Productivity-related types
export interface WorkSession {
  id: string;
  startTime: number;
  endTime?: number;
  duration: number; // in minutes
  description: string;
  coinsEarned: number;
  completed: boolean;
}

export interface ProductivityState {
  coins: number;
  totalWorkTime: number; // in minutes
  totalSessions: number;
  currentSession: WorkSession | null;
  workHistory: WorkSession[];
  lastWorkDate: number;
}

export interface ActionCost {
  feed: number;
  play: number;
  rest: number;
}

// Constants for gameplay
export const STAT_LIMITS = {
  MIN: 0,
  MAX: 100
};

export const ACTION_EFFECTS = {
  FEED: { hunger: 20, happiness: 5, energy: -2 },
  PLAY: { hunger: -10, happiness: 15, energy: -15 },
  REST: { hunger: -5, happiness: 5, energy: 25 }
};

export const DECAY_RATE = {
  HUNGER: 0.5, // per minute
  HAPPINESS: 0.3, // per minute
  ENERGY: 0.2 // per minute
};

// Productivity constants
export const COINS_PER_MINUTE = 2;
export const MIN_WORK_SESSION = 5; // minimum 5 minutes to earn coins

export const ACTION_COSTS: ActionCost = {
  feed: 10,
  play: 15,
  rest: 5
};

export const INITIAL_PET_STATE: PetState = {
  name: 'Buddy',
  hunger: 50,
  happiness: 50,
  energy: 50,
  lastUpdated: Date.now()
};

export const INITIAL_PRODUCTIVITY_STATE: ProductivityState = {
  coins: 50, // Starting coins
  totalWorkTime: 0,
  totalSessions: 0,
  currentSession: null,
  workHistory: [],
  lastWorkDate: Date.now()
};
