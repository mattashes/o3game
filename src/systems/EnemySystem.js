import { EnemyTypes, EnemyBehaviors, EnemyConfigs } from '../config/enemies.js';

export class EnemySystem {
    constructor(scene) {
        this.scene = scene;
        this.enemies = null;
        this.nextSpawnTime = 0;
        this.spawnDelay = 2000; // 2 seconds between spawns
        this.maxEnemies = 50;
    }

    createEnemyGroup() {
        console.log('Creating enemy group');
        this.enemies = this.scene.physics.add.group();
        console.log('Enemy group created:', this.enemies);
        return this.enemies;
    }

    update(time, player) {
        if (!player.active || player.getData('isDead')) return;

        // Spawn new enemies
        if (time > this.nextSpawnTime && this.enemies.getLength() < this.maxEnemies) {
            this.spawnEnemy();
            this.nextSpawnTime = time + this.spawnDelay;
        }

        this.handleEnemyBehavior(player);
    }

    handleEnemyBehavior(player) {
        this.enemies.children.entries.forEach(enemy => {
            if (enemy.getData('isDead')) return;

            const behavior = enemy.getData('behavior');
            const speed = enemy.getData('speed') || 100;

            switch (behavior) {
                case EnemyBehaviors.CHASE:
                    this.handleChasePattern(enemy, speed, player);
                    break;
                case EnemyBehaviors.PHASING:
                    this.handlePhasingPattern(enemy, speed, player);
                    break;
                case EnemyBehaviors.FLYING:
                    this.handleFlyingPattern(enemy, speed, player);
                    break;
            }

            this.tryEnemyAttack(enemy, player);
        });
    }

    handleChasePattern(enemy, speed, player) {
        const angle = Phaser.Math.Angle.Between(enemy.x, enemy.y, player.x, player.y);
        enemy.body.velocity.setToPolar(angle, speed);

        // Update facing direction
        if (enemy.body.velocity.x !== 0) {
            enemy.setFlipX(enemy.body.velocity.x < 0);
        }

        // Update animation
        if (!enemy.getData('isMoving')) {
            enemy.setData('isMoving', true);
            enemy.play('skeleton_run_anim', true);
        }
    }

    handlePhasingPattern(enemy, speed, player) {
        const time = this.scene.time.now;
        const phasingInterval = 3000; // Phase every 3 seconds
        const phasingDuration = 1000; // Phase for 1 second

        const isPhasing = time % phasingInterval < phasingDuration;
        enemy.setData('isPhasing', isPhasing);
        enemy.alpha = isPhasing ? 0.5 : 1;

        if (!isPhasing) {
            this.handleChasePattern(enemy, speed, player);
        } else {
            enemy.body.velocity.setTo(0, 0);
            if (enemy.getData('isMoving')) {
                enemy.setData('isMoving', false);
                enemy.play('skeleton_idle_anim', true);
            }
        }
    }

    handleFlyingPattern(enemy, speed, player) {
        const angle = Phaser.Math.Angle.Between(enemy.x, enemy.y, player.x, player.y);
        const distance = Phaser.Math.Distance.Between(enemy.x, enemy.y, player.x, player.y);
        
        if (distance > 200) {
            enemy.body.velocity.setToPolar(angle, speed);
            if (!enemy.getData('isMoving')) {
                enemy.setData('isMoving', true);
                enemy.play('skeleton_run_anim', true);
            }
        } else {
            const perpAngle = angle + Math.PI / 2;
            enemy.body.velocity.setToPolar(perpAngle, speed);
        }
        
        // Update facing direction
        if (enemy.body.velocity.x !== 0) {
            enemy.setFlipX(enemy.body.velocity.x < 0);
        }
    }

    tryEnemyAttack(enemy, player) {
        if (enemy.getData('isPhasing')) return;

        const distance = Phaser.Math.Distance.Between(
            enemy.x, enemy.y,
            player.x, player.y
        );

        const attackRange = enemy.getData('attackRange') || 50;
        const attackCooldown = enemy.getData('attackCooldown') || 1000;
        const lastAttackTime = enemy.getData('lastAttackTime') || 0;
        const currentTime = this.scene.time.now;

        if (distance <= attackRange && currentTime - lastAttackTime >= attackCooldown) {
            enemy.setData('lastAttackTime', currentTime);
            return true;
        }

        return false;
    }

    spawnEnemy() {
        const spawnDistance = 400;
        const angle = Math.random() * Math.PI * 2;
        const x = this.scene.player.x + Math.cos(angle) * spawnDistance;
        const y = this.scene.player.y + Math.sin(angle) * spawnDistance;

        if (!this.isWithinWorldBounds(x, y)) {
            console.log('Enemy spawn position out of bounds:', x, y);
            return null;
        }

        console.log('Attempting to spawn enemy at:', x, y);
        const enemy = this.enemies.create(x, y, 'skeleton_idle');
        console.log('Enemy created:', enemy);
        
        // Enable physics for the enemy
        this.scene.physics.world.enable(enemy);
        enemy.body.setCollideWorldBounds(true);
        
        // Set up enemy data
        enemy.setData({
            type: 'skeleton',
            health: 100,
            speed: 100,
            behavior: EnemyBehaviors.CHASE,
            attackRange: 50,
            attackDamage: 10,
            attackCooldown: 1000,
            experience: 10,
            isMoving: false,
            isDead: false
        });

        console.log('Enemy setup complete. Data:', enemy.getData());
        
        return enemy;
    }

    killEnemy(enemy) {
        if (enemy.getData('isDead')) return;

        enemy.setData('isDead', true);
        enemy.body.velocity.setTo(0, 0);
        enemy.play('skeleton_death_anim');

        enemy.on('animationcomplete', (animation) => {
            if (animation.key === 'skeleton_death_anim') {
                enemy.destroy();
            }
        });
    }

    findNearestEnemy(source) {
        let nearestEnemy = null;
        let nearestDistance = Infinity;

        this.enemies.children.entries.forEach(enemy => {
            if (!enemy.active || enemy.getData('isDead')) return;

            const distance = Phaser.Math.Distance.Between(
                source.x, source.y,
                enemy.x, enemy.y
            );

            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestEnemy = enemy;
            }
        });

        return nearestEnemy;
    }

    isWithinWorldBounds(x, y) {
        return x >= 0 && x <= this.scene.worldSize.width &&
               y >= 0 && y <= this.scene.worldSize.height;
    }

    cleanup() {
        if (this.enemies) {
            this.enemies.clear(true, true);
        }
    }
} 