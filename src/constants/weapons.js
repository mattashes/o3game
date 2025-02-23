// Weapon Types Configuration
export const WeaponTypes = {
    DAGGER: 'dagger',
    BOW: 'bow',
    MAGIC_WAND: 'magic-wand',
    THROWING_AXE: 'throwing-axe',
    HOLY_CROSS: 'holy-cross',
    GARLIC: 'garlic',
    WHIP: 'whip',
    BIBLE: 'bible'
};

// Status Effects
export const StatusEffects = {
    BURN: 'burn',
    SLOW: 'slow',
    POISON: 'poison',
    STUN: 'stun',
    FREEZE: 'freeze'
};

// Weapon Behaviors
export const WeaponBehaviors = {
    PROJECTILE: 'projectile',
    AREA: 'area',
    ORBIT: 'orbit',
    MELEE: 'melee',
    STATIONARY: 'stationary'
};

// Weapon Configurations
export const WeaponConfigs = {
    [WeaponTypes.DAGGER]: {
        damage: 10,
        cooldown: 500,
        speed: 300,
        range: 200,
        behavior: WeaponBehaviors.PROJECTILE,
        projectileCount: 1,
        knockback: 50,
        pierce: 1,
        sprite: 'dagger',
        sfx: 'daggerThrow'
    },
    [WeaponTypes.BOW]: {
        damage: 15,
        cooldown: 800,
        speed: 400,
        range: 300,
        behavior: WeaponBehaviors.PROJECTILE,
        projectileCount: 1,
        knockback: 30,
        pierce: 2,
        sprite: 'arrow',
        sfx: 'bowShoot'
    },
    [WeaponTypes.MAGIC_WAND]: {
        damage: 20,
        cooldown: 1000,
        speed: 250,
        range: 250,
        behavior: WeaponBehaviors.PROJECTILE,
        projectileCount: 3,
        spread: 30, // Spread angle in degrees
        statusEffect: StatusEffects.FREEZE,
        statusDuration: 2000,
        sprite: 'magic_bolt',
        sfx: 'magicCast'
    },
    [WeaponTypes.THROWING_AXE]: {
        damage: 25,
        cooldown: 1200,
        speed: 200,
        range: 200,
        behavior: WeaponBehaviors.PROJECTILE,
        projectileCount: 1,
        returnToPlayer: true,
        knockback: 100,
        sprite: 'axe',
        sfx: 'axeThrow',
        rotation: true
    },
    [WeaponTypes.HOLY_CROSS]: {
        damage: 15,
        cooldown: 2000,
        speed: 150,
        range: 200,
        behavior: WeaponBehaviors.PROJECTILE,
        projectileCount: 4,
        crossPattern: true,
        pierce: Infinity,
        sprite: 'cross',
        sfx: 'holyCast'
    },
    [WeaponTypes.GARLIC]: {
        damage: 5,
        cooldown: 500,
        range: 100,
        behavior: WeaponBehaviors.AREA,
        areaType: 'circle',
        pulseRate: 500,
        statusEffect: StatusEffects.POISON,
        statusDuration: 3000,
        sprite: 'garlic_aura',
        sfx: 'garlicPulse'
    },
    [WeaponTypes.WHIP]: {
        damage: 20,
        cooldown: 700,
        range: 150,
        behavior: WeaponBehaviors.MELEE,
        arc: 120, // Arc angle in degrees
        knockback: 80,
        sprite: 'whip',
        sfx: 'whipCrack'
    },
    [WeaponTypes.BIBLE]: {
        damage: 12,
        cooldown: 1000,
        speed: 100,
        range: 150,
        behavior: WeaponBehaviors.ORBIT,
        projectileCount: 3,
        orbitSpeed: 0.1,
        pierce: Infinity,
        sprite: 'bible',
        sfx: 'bibleOrbit'
    }
}; 