/**
 * Test fixtures for regression prevention tests
 */

export const configSchemas = {
    gameplay: {
        difficulty: 'normal',
        enemySpawnRate: 1000,
        playerSpeed: 300,
        weaponDamage: {
            sword: 10,
            bow: 5
        }
    },
    graphics: {
        resolution: '1920x1080',
        effects: true,
        shadows: true,
        particles: true
    },
    audio: {
        musicVolume: 0.5,
        sfxVolume: 0.7,
        ambient: true
    },
    controls: {
        keyboard: {
            up: 'W',
            down: 'S',
            left: 'A',
            right: 'D'
        },
        mouse: {
            sensitivity: 1.0,
            invertY: false
        }
    }
};

export const weaponConfigs = {
    sword: {
        damage: 10,
        speed: 1,
        range: 50,
        cooldown: 500,
        type: 'melee'
    },
    bow: {
        damage: 5,
        speed: 2,
        range: 300,
        cooldown: 1000,
        type: 'ranged'
    },
    staff: {
        damage: 3,
        speed: 1.5,
        range: 200,
        cooldown: 750,
        type: 'magic'
    }
};

export const enemyTypes = {
    basic: {
        health: 100,
        speed: 100,
        behavior: 'chase',
        damage: 10,
        points: 100
    },
    ranged: {
        health: 50,
        speed: 150,
        behavior: 'kite',
        damage: 5,
        points: 150
    },
    boss: {
        health: 500,
        speed: 75,
        behavior: 'pattern',
        damage: 25,
        points: 1000
    }
};

export const statusEffects = {
    slow: {
        duration: 2000,
        magnitude: 0.5,
        type: 'movement'
    },
    poison: {
        duration: 5000,
        damage: 2,
        interval: 1000,
        type: 'damage'
    },
    stun: {
        duration: 1000,
        type: 'control'
    }
};

export const eventTypes = {
    GAME_EVENTS: {
        PLAYER_DAMAGE: 'playerDamage',
        ENEMY_DEATH: 'enemyDeath',
        WEAPON_FIRE: 'weaponFire',
        LEVEL_UP: 'levelUp',
        GAME_OVER: 'gameOver'
    },
    UI_EVENTS: {
        UPDATE_SCORE: 'updateScore',
        UPDATE_HEALTH: 'updateHealth',
        SHOW_MESSAGE: 'showMessage'
    },
    SYSTEM_EVENTS: {
        ASSET_LOADED: 'assetLoaded',
        SCENE_CHANGE: 'sceneChange',
        CONFIG_UPDATE: 'configUpdate'
    }
};

export const mockSceneConfig = {
    key: 'TestScene',
    active: true,
    visible: true,
    systems: ['weapon', 'enemy', 'status'],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scale: {
        mode: 'RESIZE',
        width: 800,
        height: 600
    }
};

export const mockPlayerState = {
    position: { x: 400, y: 300 },
    velocity: { x: 0, y: 0 },
    health: 100,
    maxHealth: 100,
    level: 1,
    experience: 0,
    inventory: [],
    activeWeapon: 'sword',
    status: 'alive'
};

export const mockWorldState = {
    width: 1600,
    height: 1200,
    bounds: {
        left: 0,
        top: 0,
        right: 1600,
        bottom: 1200
    },
    regions: [
        { key: 'spawn', x: 0, y: 0, width: 400, height: 400 },
        { key: 'safe', x: 600, y: 400, width: 400, height: 400 },
        { key: 'danger', x: 1200, y: 800, width: 400, height: 400 }
    ]
};

export const mockSystemStates = {
    weapon: {
        activeWeapons: [],
        cooldowns: new Map(),
        projectiles: []
    },
    enemy: {
        activeEnemies: [],
        spawnPoints: [],
        waveNumber: 1
    },
    status: {
        activeEffects: new Map(),
        globalEffects: []
    }
}; 