import { StatusEffects } from '../config/weapons.js';

export class StatusEffectSystem {
    constructor(scene) {
        this.scene = scene;
        this.statusEffects = new Map();
    }

    update(currentTime) {
        this.statusEffects.forEach((effects, enemyId) => {
            effects.forEach((effectData, effectType) => {
                const enemy = this.scene.enemies.getChildren()
                    .find(e => e.getData('id') === enemyId);

                if (!enemy || !enemy.active) {
                    this.statusEffects.delete(enemyId);
                    return;
                }

                if (currentTime >= effectData.endTime) {
                    this.removeStatusEffect(enemy, effectType);
                } else {
                    this.applyStatusEffectBehavior(enemy, effectType);
                }
            });
        });
    }

    applyStatusEffect(enemy, effect, duration) {
        const enemyId = enemy.getData('id');
        
        if (!this.statusEffects.has(enemyId)) {
            this.statusEffects.set(enemyId, new Map());
        }

        const enemyEffects = this.statusEffects.get(enemyId);
        const currentTime = this.scene.time.now;

        enemyEffects.set(effect, {
            startTime: currentTime,
            endTime: currentTime + duration,
            lastTick: currentTime
        });

        // Apply visual effect
        enemy.setTint(this.getStatusEffectTint(effect));
    }

    applyStatusEffectBehavior(enemy, effect) {
        const enemyId = enemy.getData('id');
        const effectData = this.statusEffects.get(enemyId).get(effect);
        const currentTime = this.scene.time.now;

        switch (effect) {
            case StatusEffects.BURN:
                if (currentTime - effectData.lastTick >= 500) {
                    enemy.setData('health', enemy.getData('health') - 5);
                    effectData.lastTick = currentTime;
                }
                break;

            case StatusEffects.SLOW:
                const baseSpeed = enemy.getData('baseSpeed') || enemy.getData('speed');
                enemy.setData('speed', baseSpeed * 0.5);
                break;

            case StatusEffects.POISON:
                if (currentTime - effectData.lastTick >= 1000) {
                    enemy.setData('health', enemy.getData('health') - 3);
                    effectData.lastTick = currentTime;
                }
                break;

            case StatusEffects.STUN:
                enemy.body.velocity.setTo(0, 0);
                break;

            case StatusEffects.FREEZE:
                enemy.body.velocity.setTo(0, 0);
                if (!enemy.getData('frozen')) {
                    enemy.setData('frozen', true);
                    enemy.setAlpha(0.7);
                }
                break;
        }
    }

    removeStatusEffect(enemy, effect) {
        const enemyId = enemy.getData('id');
        const enemyEffects = this.statusEffects.get(enemyId);
        
        if (enemyEffects) {
            enemyEffects.delete(effect);
            
            if (enemyEffects.size === 0) {
                this.statusEffects.delete(enemyId);
            }
        }

        // Reset visual effects
        enemy.clearTint();
        
        switch (effect) {
            case StatusEffects.SLOW:
                const baseSpeed = enemy.getData('baseSpeed');
                if (baseSpeed) {
                    enemy.setData('speed', baseSpeed);
                }
                break;

            case StatusEffects.FREEZE:
                enemy.setData('frozen', false);
                enemy.setAlpha(1);
                break;
        }
    }

    getStatusEffectTint(effect) {
        switch (effect) {
            case StatusEffects.BURN:
                return 0xff4400;
            case StatusEffects.SLOW:
                return 0x4444ff;
            case StatusEffects.POISON:
                return 0x00ff00;
            case StatusEffects.STUN:
                return 0xffff00;
            case StatusEffects.FREEZE:
                return 0x00ffff;
            default:
                return 0xffffff;
        }
    }

    cleanup() {
        this.statusEffects.clear();
    }
} 