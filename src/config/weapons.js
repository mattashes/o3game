export const WeaponTypes = {
    SWORD: 'SWORD',
    BOW: 'BOW',
    STAFF: 'STAFF',
    DAGGER: 'DAGGER'
};

export const WeaponBehaviors = {
    MELEE: 'MELEE',
    RANGED: 'RANGED',
    MAGIC: 'MAGIC',
    STEALTH: 'STEALTH'
};

export const WeaponConfigs = {
    [WeaponTypes.SWORD]: {
        type: WeaponTypes.SWORD,
        behavior: WeaponBehaviors.MELEE,
        damage: 10,
        range: 2,
        attackSpeed: 1.0,
        sprite: 'sword.png',
        sound: 'sword_swing.mp3'
    },
    [WeaponTypes.BOW]: {
        type: WeaponTypes.BOW,
        behavior: WeaponBehaviors.RANGED,
        damage: 8,
        range: 10,
        attackSpeed: 0.8,
        sprite: 'bow.png',
        sound: 'bow_shoot.mp3'
    },
    [WeaponTypes.STAFF]: {
        type: WeaponTypes.STAFF,
        behavior: WeaponBehaviors.MAGIC,
        damage: 12,
        range: 8,
        attackSpeed: 0.6,
        sprite: 'staff.png',
        sound: 'staff_cast.mp3'
    },
    [WeaponTypes.DAGGER]: {
        type: WeaponTypes.DAGGER,
        behavior: WeaponBehaviors.STEALTH,
        damage: 15,
        range: 1,
        attackSpeed: 1.2,
        sprite: 'dagger.png',
        sound: 'dagger_stab.mp3'
    }
};

export const StatusEffects = {
    NONE: 'NONE',
    BURNING: {
        id: 'BURNING',
        duration: 5000,
        tickRate: 1000,
        damage: 2,
        sprite: 'burning.png'
    },
    FROZEN: {
        id: 'FROZEN',
        duration: 3000,
        speedReduction: 0.5,
        sprite: 'frozen.png'
    },
    POISONED: {
        id: 'POISONED',
        duration: 8000,
        tickRate: 2000,
        damage: 1,
        sprite: 'poisoned.png'
    },
    STUNNED: {
        id: 'STUNNED',
        duration: 2000,
        sprite: 'stunned.png'
    }
}; 