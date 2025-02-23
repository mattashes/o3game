/**
 * Asset Registry
 * This file serves as a central point for accessing all game assets
 */

// Character Sprites
export const Characters = {
    Player: {
        skeletonWaiter: '/assets/sprites/characters/player/8eyes_skeletonwaiter_sheet.png'
    },
    Enemies: {
        bat: '/assets/sprites/characters/enemies/bat.png',
        bee: '/assets/sprites/characters/enemies/bee.png',
        bigWorm: '/assets/sprites/characters/enemies/big_worm.png',
        eyeball: '/assets/sprites/characters/enemies/eyeball.png',
        femaleSlash: '/assets/sprites/characters/enemies/female_slash.png',
        ghost: '/assets/sprites/characters/enemies/ghost.png',
        manEaterFlower: '/assets/sprites/characters/enemies/man_eater_flower.png',
        princess: '/assets/sprites/characters/enemies/princess.png',
        aladdinCarpet: '/assets/sprites/characters/enemies/aladdin_carpet_sheet.png'
    },
    // Base character assets from LPC
    LPC: {
        base: '/assets/sprites/characters/universal-lpc-sprite_male_01_walk-3frame.png',
        // Add more specific LPC character sprites as needed
    },
    // Additional character collections
    Collection: {
        // Add specific sprites from the sprite collection as needed
    }
};

// Environment Assets
export const Environment = {
    Tiles: {
        // Add tile sets from LPC as needed
    },
    Props: {
        // Add environmental props
    },
    Background: {
        // Add background elements
    }
};

// UI Elements
export const UI = {
    Buttons: {
        // Add button assets
    },
    Icons: {
        // Add icon assets
    },
    Panels: {
        // Add panel backgrounds and frames
    }
};

// Maps
export const Maps = {
    // Add map assets as needed
};

// Asset Categories for easy access
export const AssetCategories = {
    CHARACTERS: 'characters',
    ENVIRONMENT: 'environment',
    UI: 'ui',
    MAPS: 'maps'
};

// Asset Types
export const AssetTypes = {
    SPRITE: 'sprite',
    TILESET: 'tileset',
    MAP: 'map',
    UI: 'ui'
};

// Helper function to get asset path
export function getAssetPath(category, type, name) {
    return `/assets/${category}/${type}/${name}`;
} 