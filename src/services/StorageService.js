/**
 * Service for managing game state persistence
 */
export class StorageService {
  constructor(prefix = 'o3game') {
    this._prefix = prefix;
  }

  /**
   * Save data to local storage
   * @param {string} key - Storage key
   * @param {*} data - Data to store
   */
  save(key, data) {
    try {
      const fullKey = `${this._prefix}_${key}`;
      localStorage.setItem(fullKey, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  }

  /**
   * Load data from local storage
   * @param {string} key - Storage key
   * @param {*} defaultValue - Default value if key doesn't exist
   * @returns {*} Stored data or default value
   */
  load(key, defaultValue = null) {
    try {
      const fullKey = `${this._prefix}_${key}`;
      const data = localStorage.getItem(fullKey);
      return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
      console.error('Failed to load data:', error);
      return defaultValue;
    }
  }

  /**
   * Remove data from local storage
   * @param {string} key - Storage key
   */
  remove(key) {
    try {
      const fullKey = `${this._prefix}_${key}`;
      localStorage.removeItem(fullKey);
    } catch (error) {
      console.error('Failed to remove data:', error);
    }
  }

  /**
   * Clear all game data from local storage
   */
  clearAll() {
    try {
      Object.keys(localStorage)
        .filter(key => key.startsWith(this._prefix))
        .forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('Failed to clear data:', error);
    }
  }
} 