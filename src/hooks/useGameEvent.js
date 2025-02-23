import { useEffect, useCallback } from 'react';
import { EventService } from '../services';

const eventService = new EventService();

/**
 * Hook for subscribing to game events
 * @param {string} event - Event name to subscribe to
 * @param {Function} callback - Event callback
 * @param {boolean} [once=false] - Whether to listen only once
 */
export function useGameEvent(event, callback, once = false) {
  useEffect(() => {
    const unsubscribe = once
      ? eventService.once(event, callback)
      : eventService.on(event, callback);
    
    return () => unsubscribe();
  }, [event, callback, once]);

  return useCallback((...args) => eventService.emit(event, ...args), [event]);
}

/**
 * Hook for emitting game events
 * @param {string} event - Event name to emit
 * @returns {Function} Event emitter function
 */
export function useGameEventEmitter(event) {
  return useCallback((...args) => eventService.emit(event, ...args), [event]);
} 