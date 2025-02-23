/**
 * Enemy configuration constants
 * Defines different types of enemies and their properties
 */

export const EnemyTypes = {
  BASIC: 'basic',
  FAST: 'fast',
  TANK: 'tank',
  BOSS: 'boss'
};

export const EnemyBehaviors = {
  CHASE: 'chase',
  PHASING: 'phasing',
  FLYING: 'flying',
  CIRCLING: 'circling',
  STATIONARY: 'stationary'
};

export const EnemyConfigs = {
  [EnemyTypes.BASIC]: {
    sprite: 'basic_enemy',
    health: 100,
    speed: 100,
    behavior: EnemyBehaviors.CHASE,
    attackRange: 50,
    attackDamage: 10,
    attackCooldown: 1000,
    experience: 10,
    spawnWeight: 1.0
  },
  [EnemyTypes.FAST]: {
    sprite: 'fast_enemy',
    health: 50,
    speed: 200,
    behavior: EnemyBehaviors.CHASE,
    attackRange: 40,
    attackDamage: 5,
    attackCooldown: 800,
    experience: 15,
    spawnWeight: 0.7
  },
  [EnemyTypes.TANK]: {
    sprite: 'tank_enemy',
    health: 200,
    speed: 50,
    behavior: EnemyBehaviors.CHASE,
    attackRange: 60,
    attackDamage: 15,
    attackCooldown: 1500,
    experience: 20,
    spawnWeight: 0.5
  },
  [EnemyTypes.BOSS]: {
    sprite: 'boss_enemy',
    health: 500,
    speed: 75,
    behavior: EnemyBehaviors.CIRCLING,
    attackRange: 100,
    attackDamage: 25,
    attackCooldown: 2000,
    experience: 100,
    spawnWeight: 0.1,
    scale: 1.5
  }
};

export const ENEMY_SPAWN_CONFIG = {
  initialSpawnDelay: 1000,
  spawnInterval: 2000,
  maxEnemiesOnScreen: 50,
  difficultyScaling: {
    healthMultiplier: 1.1,
    damageMultiplier: 1.05,
    spawnRateMultiplier: 1.1
  }
};

export const ENEMY_STATUS_EFFECTS = {
  POISON: {
    id: 'poison',
    damagePerTick: 5,
    tickInterval: 1000,
    duration: 5000
  },
  SLOW: {
    id: 'slow',
    speedReduction: 0.5,
    duration: 3000
  },
  STUN: {
    id: 'stun',
    duration: 1000
  }
}; 