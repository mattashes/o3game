export class PlayerController {
    constructor(scene) {
        this.scene = scene;
        this.player = null;
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.wasd = {
            up: scene.input.keyboard.addKey('W'),
            down: scene.input.keyboard.addKey('S'),
            left: scene.input.keyboard.addKey('A'),
            right: scene.input.keyboard.addKey('D')
        };
        this.facingRight = true;
    }

    createPlayer() {
        this.player = this.scene.add.sprite(
            this.scene.worldSize.width / 2,
            this.scene.worldSize.height / 2,
            'wizard_idle'
        );

        // Set up player animations
        this.player.play('wizard_idle_anim');

        this.player.setData({
            health: 100,
            maxHealth: 100,
            speed: 200,
            weapons: [],
            level: 1,
            experience: 0,
            nextLevelExp: 100,
            isMoving: false,
            isDead: false
        });

        this.scene.physics.world.enable(this.player);
        this.player.body.setCollideWorldBounds(true);

        return this.player;
    }

    handleMovement() {
        if (!this.player || !this.player.active || this.player.getData('isDead')) return;

        const speed = this.player.getData('speed');
        let dx = 0;
        let dy = 0;

        // Handle horizontal movement
        if (this.cursors.left.isDown || this.wasd.left.isDown) {
            dx = -1;
            if (this.facingRight) {
                this.facingRight = false;
                this.player.setFlipX(true);
            }
        } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
            dx = 1;
            if (!this.facingRight) {
                this.facingRight = true;
                this.player.setFlipX(false);
            }
        }

        // Handle vertical movement
        if (this.cursors.up.isDown || this.wasd.up.isDown) {
            dy = -1;
        } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
            dy = 1;
        }

        // Normalize diagonal movement
        if (dx !== 0 && dy !== 0) {
            const normalizer = Math.sqrt(0.5);
            dx *= normalizer;
            dy *= normalizer;
        }

        // Apply movement
        this.player.body.velocity.x = dx * speed;
        this.player.body.velocity.y = dy * speed;

        // Update animation state
        const isMoving = dx !== 0 || dy !== 0;
        if (isMoving !== this.player.getData('isMoving')) {
            this.player.setData('isMoving', isMoving);
            this.player.play(isMoving ? 'wizard_run_anim' : 'wizard_idle_anim', true);
        }

        // Keep player within world bounds
        this.player.x = Phaser.Math.Clamp(
            this.player.x,
            0,
            this.scene.worldSize.width
        );
        this.player.y = Phaser.Math.Clamp(
            this.player.y,
            0,
            this.scene.worldSize.height
        );
    }

    addExperience(amount) {
        const currentExp = this.player.getData('experience') + amount;
        const nextLevelExp = this.player.getData('nextLevelExp');
        
        this.player.setData('experience', currentExp);
        
        if (currentExp >= nextLevelExp) {
            this.levelUp();
        }
    }

    levelUp() {
        const currentLevel = this.player.getData('level');
        const currentHealth = this.player.getData('health');
        const maxHealth = this.player.getData('maxHealth');
        
        this.player.setData({
            level: currentLevel + 1,
            experience: 0,
            nextLevelExp: Math.floor(this.player.getData('nextLevelExp') * 1.2),
            health: Math.min(currentHealth + 20, maxHealth),
            maxHealth: maxHealth + 10
        });

        this.scene.showLevelUpEffect();
    }

    takeDamage(amount) {
        if (this.player.getData('isDead')) return;

        const currentHealth = this.player.getData('health');
        this.player.setData('health', Math.max(0, currentHealth - amount));

        // Flash the player red when taking damage
        this.scene.tweens.add({
            targets: this.player,
            tint: 0xff0000,
            duration: 100,
            yoyo: true,
            onComplete: () => {
                this.player.clearTint();
            }
        });

        if (this.player.getData('health') <= 0) {
            this.die();
        }
    }

    die() {
        this.player.setData('isDead', true);
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        
        // Play death animation
        this.player.play('wizard_death_anim');
        
        // Wait for death animation to complete before game over
        this.player.on('animationcomplete', (animation) => {
            if (animation.key === 'wizard_death_anim') {
                this.scene.gameOver();
            }
        });
    }

    cleanup() {
        if (this.player) {
            this.player.destroy();
        }
    }
} 