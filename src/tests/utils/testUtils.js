/**
 * Test utilities for regression prevention
 */

/**
 * Verifies that an object maintains its critical properties
 * @param {Object} object - Object to verify
 * @param {Array<string>} requiredProps - Array of required property names
 * @param {Object} propTypes - Object mapping property names to their expected types
 * @returns {boolean} - True if all properties exist and are of correct type
 */
export const verifyObjectProperties = (object, requiredProps, propTypes = {}) => {
    return requiredProps.every(prop => {
        const hasProperty = object.hasOwnProperty(prop);
        const correctType = !propTypes[prop] || typeof object[prop] === propTypes[prop];
        return hasProperty && correctType;
    });
};

/**
 * Verifies that a game entity maintains its required data properties
 * @param {Object} entity - Game entity to verify
 * @param {Array<string>} requiredData - Array of required data property names
 * @returns {boolean} - True if all data properties exist
 */
export const verifyEntityData = (entity, requiredData) => {
    return requiredData.every(prop => entity.getData(prop) !== undefined);
};

/**
 * Creates a mock game state for testing
 * @param {Object} overrides - Properties to override in default state
 * @returns {Object} - Mock game state
 */
export const createMockGameState = (overrides = {}) => {
    const defaultState = {
        player: {
            health: 100,
            position: { x: 0, y: 0 },
            inventory: [],
            status: 'alive'
        },
        enemies: [],
        weapons: [],
        score: 0,
        level: 1,
        time: Date.now()
    };

    return { ...defaultState, ...overrides };
};

/**
 * Verifies that a system maintains its critical methods
 * @param {Object} system - System to verify
 * @param {Array<string>} requiredMethods - Array of required method names
 * @returns {boolean} - True if all methods exist and are functions
 */
export const verifySystemMethods = (system, requiredMethods) => {
    return requiredMethods.every(method => 
        typeof system[method] === 'function'
    );
};

/**
 * Creates a mock event handler for testing
 * @param {Function} callback - Optional callback to execute
 * @returns {Object} - Mock event handler with spy functions
 */
export const createMockEventHandler = (callback = () => {}) => {
    return {
        handleEvent: jest.fn(callback),
        cleanup: jest.fn(),
        isActive: jest.fn(() => true)
    };
};

/**
 * Verifies that a configuration object maintains required structure
 * @param {Object} config - Configuration object to verify
 * @param {Object} schema - Schema describing required structure
 * @returns {boolean} - True if config matches schema
 */
export const verifyConfigStructure = (config, schema) => {
    const verifyStructure = (obj, schemaSection) => {
        return Object.keys(schemaSection).every(key => {
            if (typeof schemaSection[key] === 'object') {
                return obj[key] && verifyStructure(obj[key], schemaSection[key]);
            }
            return obj.hasOwnProperty(key) && 
                   typeof obj[key] === typeof schemaSection[key];
        });
    };
    
    return verifyStructure(config, schema);
};

/**
 * Creates a mock system that implements common system interface
 * @param {Object} methods - Methods to include in mock system
 * @returns {Object} - Mock system
 */
export const createMockSystem = (methods = {}) => {
    return {
        init: jest.fn(),
        update: jest.fn(),
        cleanup: jest.fn(),
        isActive: jest.fn(() => true),
        ...methods
    };
};

/**
 * Simulates a game update cycle
 * @param {Object} scene - Game scene
 * @param {number} deltaTime - Time since last update
 */
export const simulateGameUpdate = (scene, deltaTime = 16.67) => {
    scene.systems.forEach(system => {
        if (system.isActive()) {
            system.update(deltaTime);
        }
    });
};

/**
 * Verifies that error handling behaves correctly
 * @param {Function} operation - Function that might throw
 * @param {Function} cleanup - Cleanup function to call after test
 * @returns {Object} - Test results including error and cleanup success
 */
export const verifyErrorHandling = (operation, cleanup = () => {}) => {
    let error = null;
    let cleanupSuccess = true;
    
    try {
        operation();
    } catch (e) {
        error = e;
    } finally {
        try {
            cleanup();
        } catch (e) {
            cleanupSuccess = false;
        }
    }
    
    return { error, cleanupSuccess };
}; 