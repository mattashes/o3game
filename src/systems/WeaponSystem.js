import { WeaponTypes, WeaponBehaviors, WeaponConfigs } from '../config/weapons.js';

export class WeaponSystem {
    constructor(scene) {
        this.scene = scene;
        this.weapons = scene.add.group();
        this.orbitingWeapons = new Map();
        this.areaEffects = new Map();
    }

    createWeaponGroup() {
        return this.weapons;
    }

    initializeWeapons(player) {
        const initialWeapon = {
            ...WeaponConfigs[WeaponTypes.DAGGER],
            type: WeaponTypes.DAGGER,
            cooldown: 1000
        };
        player.setData('weapons', [initialWeapon]);
    }

    handleWeaponBehavior(currentTime, player) {
        const weapons = player.getData('weapons') || [];
        weapons.forEach(weapon => {
            if (!weapon.lastFired || currentTime - weapon.lastFired >= weapon.cooldown) {
                this.fireWeapon(weapon, currentTime, player);
                weapon.lastFired = currentTime;
            }
        });

        this.updateOrbitingWeapons(player);
        this.updateAreaEffects(currentTime);
        this.checkWeaponRanges();
    }

    fireWeapon(weapon, currentTime, player) {
        const behavior = weapon.behavior || WeaponBehaviors.PROJECTILE;
        
        switch (behavior) {
            case WeaponBehaviors.PROJECTILE:
                this.fireProjectileWeapon(weapon, currentTime, player);
                break;
            case WeaponBehaviors.AREA:
                this.createAreaEffect(weapon, currentTime, player);
                break;
            case WeaponBehaviors.ORBIT:
                this.createOrbitingWeapon(weapon, currentTime, player);
                break;
            case WeaponBehaviors.MELEE:
                this.performMeleeAttack(weapon, currentTime, player);
                break;
            case WeaponBehaviors.STATIONARY:
                this.createStationaryWeapon(weapon, currentTime, player);
                break;
        }
    }

    fireProjectileWeapon(weapon, currentTime, player) {
        const playerPos = {
            x: Phaser.Math.Clamp(player.x, 0, this.scene.worldSize.width),
            y: Phaser.Math.Clamp(player.y, 0, this.scene.worldSize.height)
        };

        const nearestEnemy = this.scene.enemySystem.findNearestEnemy(player);
        const angle = nearestEnemy ? 
            Phaser.Math.Angle.Between(playerPos.x, playerPos.y, nearestEnemy.x, nearestEnemy.y) : 
            0;

        const projectile = this.weapons.create(playerPos.x, playerPos.y, weapon.sprite || 'dagger');
        
        // Enable physics for the projectile
        this.scene.physics.world.enable(projectile);
        
        projectile.setData({
            ...weapon,
            type: weapon.type,
            startX: playerPos.x,
            startY: playerPos.y,
            pierce: weapon.pierce || 1,
            hitEnemies: new Set(),
            range: weapon.range || 200
        });

        if (weapon.rotation) {
            this.scene.tweens.add({
                targets: projectile,
                rotation: Math.PI * 2,
                duration: 1000,
                repeat: -1
            });
        }

        projectile.rotation = angle;
        projectile.body.velocity.setToPolar(angle, weapon.speed || 200);

        if (weapon.returnToPlayer) {
            this.scene.time.delayedCall(1000, () => {
                if (projectile.active) {
                    this.returnProjectileToPlayer(projectile, player);
                }
            });
        }

        if (weapon.sfx) {
            this.scene.sound.play(weapon.sfx);
        }
    }

    createAreaEffect(weapon, currentTime, player) {
        if (!this.areaEffects.has(weapon.type)) {
            const areaEffect = this.scene.add.circle(
                player.x,
                player.y,
                weapon.range,
                0xffff00,
                0.2
            );
            
            this.areaEffects.set(weapon.type, {
                effect: areaEffect,
                weapon,
                lastPulse: currentTime
            });

            this.scene.tweens.add({
                targets: areaEffect,
                alpha: 0.4,
                duration: weapon.pulseRate,
                yoyo: true,
                repeat: -1
            });
        }
    }

    createOrbitingWeapon(weapon, currentTime, player) {
        if (!this.orbitingWeapons.has(weapon.type)) {
            const orbitingGroup = [];
            const angleStep = (Math.PI * 2) / weapon.projectileCount;

            for (let i = 0; i < weapon.projectileCount; i++) {
                const projectile = this.weapons.create(player.x, player.y, weapon.sprite);
                projectile.setData({
                    ...weapon,
                    orbitAngle: angleStep * i,
                    startTime: currentTime
                });
                orbitingGroup.push(projectile);
            }

            this.orbitingWeapons.set(weapon.type, orbitingGroup);
        }
    }

    updateOrbitingWeapons(player) {
        this.orbitingWeapons.forEach((projectiles, type) => {
            projectiles.forEach(projectile => {
                const data = projectile.getData('orbitAngle');
                const radius = 50;
                const speed = 0.02;
                
                data.orbitAngle += speed;
                
                projectile.x = player.x + Math.cos(data.orbitAngle) * radius;
                projectile.y = player.y + Math.sin(data.orbitAngle) * radius;
            });
        });
    }

    updateAreaEffects(currentTime) {
        this.areaEffects.forEach((data, type) => {
            const { effect, weapon, lastPulse } = data;
            effect.x = this.scene.player.x;
            effect.y = this.scene.player.y;

            if (currentTime - lastPulse >= weapon.pulseRate) {
                this.scene.enemies.getChildren().forEach(enemy => {
                    if (Phaser.Math.Distance.Between(
                        effect.x, effect.y,
                        enemy.x, enemy.y
                    ) <= weapon.range) {
                        this.handleWeaponEnemyCollision(weapon, enemy);
                    }
                });
                data.lastPulse = currentTime;
            }
        });
    }

    checkWeaponRanges() {
        this.weapons.children.entries.forEach(projectile => {
            const data = projectile.getData();
            if (data && data.range) {
                const distance = Phaser.Math.Distance.Between(
                    data.startX, data.startY,
                    projectile.x, projectile.y
                );
                if (distance > data.range) {
                    projectile.destroy();
                }
            }
        });
    }

    returnProjectileToPlayer(projectile, player) {
        const angle = Phaser.Math.Angle.Between(
            projectile.x, projectile.y,
            player.x, player.y
        );
        projectile.rotation = angle;
        projectile.body.velocity.setToPolar(angle, 300);
    }

    handleWeaponEnemyCollision(weapon, enemy) {
        const damage = weapon.damage || 1;
        enemy.setData('health', enemy.getData('health') - damage);

        if (weapon.knockback) {
            const angle = Phaser.Math.Angle.Between(
                this.scene.player.x, this.scene.player.y,
                enemy.x, enemy.y
            );
            this.applyKnockback(enemy, angle, weapon.knockback);
        }

        if (weapon.statusEffect) {
            this.scene.statusEffectSystem.applyStatusEffect(
                enemy,
                weapon.statusEffect.type,
                weapon.statusEffect.duration
            );
        }
    }

    applyKnockback(enemy, angle, force) {
        enemy.body.velocity.setToPolar(angle, force);
        this.scene.time.delayedCall(100, () => {
            if (enemy.active) {
                enemy.body.velocity.setTo(0, 0);
            }
        });
    }

    cleanup() {
        this.weapons.clear(true, true);
        this.orbitingWeapons.clear();
        this.areaEffects.forEach(data => data.effect.destroy());
        this.areaEffects.clear();
    }
} 