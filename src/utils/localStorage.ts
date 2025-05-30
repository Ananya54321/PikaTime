import type { PetState, ProductivityState } from '../types/Pet';
import { INITIAL_PET_STATE, INITIAL_PRODUCTIVITY_STATE } from '../types/Pet';

const STORAGE_KEY = 'virtualPetState';
const PRODUCTIVITY_STORAGE_KEY = 'virtualPetProductivity';

/**
 * Save pet state to localStorage
 */
export const savePetState = (petState: PetState): void => {
  try {
    const serializedState = JSON.stringify(petState);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (error) {
    console.error('Failed to save pet state to localStorage:', error);
  }
};

/**
 * Load pet state from localStorage
 */
export const loadPetState = (): PetState => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return INITIAL_PET_STATE;
    }
    const parsed = JSON.parse(serializedState);
    
    // Validate the loaded state has all required properties
    if (
      typeof parsed.name === 'string' &&
      typeof parsed.hunger === 'number' &&
      typeof parsed.happiness === 'number' &&
      typeof parsed.energy === 'number' &&
      typeof parsed.lastUpdated === 'number'
    ) {
      return parsed;
    } else {
      console.warn('Invalid pet state in localStorage, using initial state');
      return INITIAL_PET_STATE;
    }
  } catch (error) {
    console.error('Failed to load pet state from localStorage:', error);
    return INITIAL_PET_STATE;
  }
};

/**
 * Clear pet state from localStorage
 */
export const clearPetState = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear pet state from localStorage:', error);
  }
};

/**
 * Save productivity state to localStorage
 */
export const saveProductivityState = (productivityState: ProductivityState): void => {
  try {
    const serializedState = JSON.stringify(productivityState);
    localStorage.setItem(PRODUCTIVITY_STORAGE_KEY, serializedState);
  } catch (error) {
    console.error('Failed to save productivity state to localStorage:', error);
  }
};

/**
 * Load productivity state from localStorage
 */
export const loadProductivityState = (): ProductivityState => {
  try {
    const serializedState = localStorage.getItem(PRODUCTIVITY_STORAGE_KEY);
    if (serializedState === null) {
      return INITIAL_PRODUCTIVITY_STATE;
    }
    const parsed = JSON.parse(serializedState);
    
    // Validate the loaded state has all required properties
    if (
      typeof parsed.coins === 'number' &&
      typeof parsed.totalWorkTime === 'number' &&
      typeof parsed.totalSessions === 'number' &&
      Array.isArray(parsed.workHistory) &&
      typeof parsed.lastWorkDate === 'number'
    ) {
      return parsed;
    } else {
      console.warn('Invalid productivity state in localStorage, using initial state');
      return INITIAL_PRODUCTIVITY_STATE;
    }
  } catch (error) {
    console.error('Failed to load productivity state from localStorage:', error);
    return INITIAL_PRODUCTIVITY_STATE;
  }
};

/**
 * Clear productivity state from localStorage
 */
export const clearProductivityState = (): void => {
  try {
    localStorage.removeItem(PRODUCTIVITY_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear productivity state from localStorage:', error);
  }
};
