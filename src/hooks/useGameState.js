import { useState, useCallback } from 'react';
import { StorageService } from '../services';

const storage = new StorageService();

/**
 * Custom hook for managing persistent game state
 * @param {string} key - Storage key for the state
 * @param {*} initialState - Initial state value
 * @returns {[*, Function]} State and update function
 */
export function useGameState(key, initialState) {
  const [state, setState] = useState(() => {
    const savedState = storage.load(key);
    return savedState !== null ? savedState : initialState;
  });

  const updateState = useCallback((newState) => {
    const value = typeof newState === 'function' ? newState(state) : newState;
    setState(value);
    storage.save(key, value);
  }, [key, state]);

  return [state, updateState];
} 