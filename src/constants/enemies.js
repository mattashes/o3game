export const EnemyTypes = {
    BAT: 'bat',
    BEE: 'bee',
    BIG_WORM: 'big-worm',
    EYEBALL: 'eyeball',
    FEMALE_SLASH: 'female-slash',
    GHOST: 'ghost',
    MAN_EATER_FLOWER: 'man-eater-flower',
    PRINCESS: 'princess',
    ALADDIN_CARPET: 'aladdin-carpet'
};

export const EnemyBehaviors = {
    CHASE: 'chase',
    PHASING: 'phasing',
    FLYING: 'flying',
    CIRCLING: 'circling',
    STATIONARY: 'stationary'
};

export const EnemyConfigs = {
    [EnemyTypes.BAT]: {
        sprite: 'bat',
        health: 20,
        speed: 150,
        behavior: EnemyBehaviors.CHASE,
        attackRange: 50,
        attackDamage: 8,
        attackCooldown: 1000,
        experience: 8
    },
    [EnemyTypes.BEE]: {
        sprite: 'bee',
        health: 15,
        speed: 180,
        behavior: EnemyBehaviors.CHASE,
        attackRange: 40,
        attackDamage: 5,
        attackCooldown: 800,
        experience: 6
    },
    [EnemyTypes.BIG_WORM]: {
        sprite: 'big-worm',
        health: 50,
        speed: 80,
        behavior: EnemyBehaviors.CHASE,
        attackRange: 60,
        attackDamage: 15,
        attackCooldown: 2000,
        experience: 15
    },
    [EnemyTypes.EYEBALL]: {
        sprite: 'eyeball',
        health: 25,
        speed: 100,
        behavior: EnemyBehaviors.CIRCLING,
        attackRange: 150,
        attackDamage: 10,
        attackCooldown: 1500,
        experience: 10
    },
    [EnemyTypes.FEMALE_SLASH]: {
        sprite: 'female-slash',
        health: 35,
        speed: 140,
        behavior: EnemyBehaviors.CHASE,
        attackRange: 70,
        attackDamage: 12,
        attackCooldown: 1200,
        experience: 12
    },
    [EnemyTypes.GHOST]: {
        sprite: 'ghost',
        health: 30,
        speed: 120,
        behavior: EnemyBehaviors.PHASING,
        attackRange: 50,
        attackDamage: 15,
        attackCooldown: 1500,
        experience: 12,
        phaseDuration: 2000,
        phaseInterval: 5000
    },
    [EnemyTypes.MAN_EATER_FLOWER]: {
        sprite: 'man-eater-flower',
        health: 45,
        speed: 0,
        behavior: EnemyBehaviors.STATIONARY,
        attackRange: 150,
        attackDamage: 20,
        attackCooldown: 2000,
        experience: 15
    },
    [EnemyTypes.PRINCESS]: {
        sprite: 'princess',
        health: 60,
        speed: 130,
        behavior: EnemyBehaviors.CHASE,
        attackRange: 80,
        attackDamage: 18,
        attackCooldown: 1500,
        experience: 20
    },
    [EnemyTypes.ALADDIN_CARPET]: {
        sprite: 'aladdin-carpet',
        health: 40,
        speed: 160,
        behavior: EnemyBehaviors.FLYING,
        attackRange: 100,
        attackDamage: 12,
        attackCooldown: 1000,
        experience: 15
    }
}; 