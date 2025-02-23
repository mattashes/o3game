/**
 * Service for managing game configuration
 */
export class ConfigService {
  constructor() {
    this._config = {
      debug: {
        enabled: process.env.NODE_ENV === 'development',
        showFPS: false,
        showHitboxes: false
      },
      graphics: {
        resolution: 1,
        particleEffects: true,
        shadows: true
      },
      audio: {
        musicVolume: 0.5,
        sfxVolume: 0.7,
        masterVolume: 1.0
      },
      gameplay: {
        difficulty: 'normal',
        tutorialEnabled: true,
        screenShake: true
      },
      controls: {
        keyboard: {
          up: 'W',
          down: 'S',
          left: 'A',
          right: 'D',
          attack: 'SPACE'
        },
        mouse: {
          sensitivity: 1.0,
          invertY: false
        }
      }
    };
  }

  /**
   * Get a configuration value
   * @param {string} path - Dot-notation path to config value
   * @param {*} defaultValue - Default value if path doesn't exist
   * @returns {*} Configuration value
   */
  get(path, defaultValue = null) {
    return path.split('.').reduce((obj, key) => 
      obj && obj[key] !== undefined ? obj[key] : defaultValue, 
      this._config
    );
  }

  /**
   * Set a configuration value
   * @param {string} path - Dot-notation path to config value
   * @param {*} value - Value to set
   */
  set(path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((obj, key) => {
      if (!(key in obj)) obj[key] = {};
      return obj[key];
    }, this._config);
    target[lastKey] = value;
  }

  /**
   * Reset configuration to defaults
   */
  resetToDefaults() {
    this._config = this.constructor.getDefaultConfig();
  }

  /**
   * Get the entire configuration object
   * @returns {Object} Configuration object
   */
  getAll() {
    return { ...this._config };
  }

  /**
   * Update multiple configuration values
   * @param {Object} updates - Object with path-value pairs
   */
  updateMultiple(updates) {
    Object.entries(updates).forEach(([path, value]) => {
      this.set(path, value);
    });
  }
} 