/**
 * Service for consistent logging throughout the game
 */
export class LoggerService {
  constructor(options = {}) {
    this._prefix = options.prefix || 'O3Game';
    this._level = options.level || 'info';
    this._levels = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3
    };
  }

  /**
   * Set the logging level
   * @param {string} level - Logging level (debug, info, warn, error)
   */
  setLevel(level) {
    if (this._levels[level] !== undefined) {
      this._level = level;
    }
  }

  /**
   * Format a log message
   * @private
   * @param {string} level - Log level
   * @param {string} message - Log message
   * @param {Object} [data] - Additional data to log
   * @returns {string} Formatted message
   */
  _format(level, message, data) {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${this._prefix}] [${level.toUpperCase()}] ${message}${
      data ? '\n' + JSON.stringify(data, null, 2) : ''
    }`;
  }

  /**
   * Check if a log level should be shown
   * @private
   * @param {string} level - Log level to check
   * @returns {boolean} Whether the level should be shown
   */
  _shouldLog(level) {
    return this._levels[level] >= this._levels[this._level];
  }

  /**
   * Log a debug message
   * @param {string} message - Message to log
   * @param {Object} [data] - Additional data to log
   */
  debug(message, data) {
    if (this._shouldLog('debug')) {
      console.debug(this._format('debug', message, data));
    }
  }

  /**
   * Log an info message
   * @param {string} message - Message to log
   * @param {Object} [data] - Additional data to log
   */
  info(message, data) {
    if (this._shouldLog('info')) {
      console.info(this._format('info', message, data));
    }
  }

  /**
   * Log a warning message
   * @param {string} message - Message to log
   * @param {Object} [data] - Additional data to log
   */
  warn(message, data) {
    if (this._shouldLog('warn')) {
      console.warn(this._format('warn', message, data));
    }
  }

  /**
   * Log an error message
   * @param {string} message - Message to log
   * @param {Error|Object} [error] - Error object or additional data
   */
  error(message, error) {
    if (this._shouldLog('error')) {
      console.error(this._format('error', message, error));
    }
  }
} 