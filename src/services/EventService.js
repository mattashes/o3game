/**
 * Service for managing game-wide events
 */
export class EventService {
  constructor() {
    this._listeners = new Map();
    this._onceListeners = new Map();
  }

  /**
   * Subscribe to an event
   * @param {string} event - Event name
   * @param {Function} callback - Event callback
   * @returns {Function} Unsubscribe function
   */
  on(event, callback) {
    if (!this._listeners.has(event)) {
      this._listeners.set(event, new Set());
    }
    this._listeners.get(event).add(callback);

    return () => this.off(event, callback);
  }

  /**
   * Subscribe to an event once
   * @param {string} event - Event name
   * @param {Function} callback - Event callback
   * @returns {Function} Unsubscribe function
   */
  once(event, callback) {
    const wrappedCallback = (...args) => {
      this.off(event, wrappedCallback);
      callback(...args);
    };

    if (!this._onceListeners.has(event)) {
      this._onceListeners.set(event, new Set());
    }
    this._onceListeners.get(event).add(wrappedCallback);

    return () => this.off(event, wrappedCallback);
  }

  /**
   * Unsubscribe from an event
   * @param {string} event - Event name
   * @param {Function} callback - Event callback
   */
  off(event, callback) {
    if (this._listeners.has(event)) {
      this._listeners.get(event).delete(callback);
    }
    if (this._onceListeners.has(event)) {
      this._onceListeners.get(event).delete(callback);
    }
  }

  /**
   * Emit an event
   * @param {string} event - Event name
   * @param {...*} args - Event arguments
   */
  emit(event, ...args) {
    if (this._listeners.has(event)) {
      this._listeners.get(event).forEach(callback => {
        try {
          callback(...args);
        } catch (error) {
          console.error(`Error in event listener for ${event}:`, error);
        }
      });
    }

    if (this._onceListeners.has(event)) {
      this._onceListeners.get(event).forEach(callback => {
        try {
          callback(...args);
        } catch (error) {
          console.error(`Error in once event listener for ${event}:`, error);
        }
      });
      this._onceListeners.delete(event);
    }
  }

  /**
   * Clear all event listeners
   */
  clear() {
    this._listeners.clear();
    this._onceListeners.clear();
  }

  /**
   * Get the number of listeners for an event
   * @param {string} event - Event name
   * @returns {number} Number of listeners
   */
  listenerCount(event) {
    const regular = (this._listeners.get(event) || new Set()).size;
    const once = (this._onceListeners.get(event) || new Set()).size;
    return regular + once;
  }
} 