export class UIManager {
    constructor(scene) {
        this.scene = scene;
        this.healthBar = null;
        this.expBar = null;
        this.scoreText = null;
        this.levelText = null;
        this.timeText = null;
        this.levelUpMenu = null;
    }

    createUI() {
        this.createHealthBar();
        this.createExpBar();
        this.createScoreAndLevel();
        this.createTimeDisplay();
    }

    createHealthBar() {
        const width = 200;
        const height = 20;
        const padding = 10;
        const x = padding;
        const y = padding;

        // Background
        this.healthBar = {
            background: this.scene.add.rectangle(x, y, width, height, 0x000000)
                .setOrigin(0, 0)
                .setScrollFactor(0)
                .setAlpha(0.5),
            bar: this.scene.add.rectangle(x, y, width, height, 0xff0000)
                .setOrigin(0, 0)
                .setScrollFactor(0)
        };

        // Add health text
        this.healthBar.text = this.scene.add.text(
            x + width / 2,
            y + height / 2,
            '100/100',
            {
                fontSize: '16px',
                fill: '#ffffff'
            }
        )
        .setOrigin(0.5)
        .setScrollFactor(0);
    }

    createExpBar() {
        const width = 400;
        const height = 10;
        const padding = 10;
        const x = (this.scene.game.config.width - width) / 2;
        const y = this.scene.game.config.height - height - padding;

        // Background
        this.expBar = {
            background: this.scene.add.rectangle(x, y, width, height, 0x000000)
                .setOrigin(0, 0)
                .setScrollFactor(0)
                .setAlpha(0.5),
            bar: this.scene.add.rectangle(x, y, width, height, 0x00ff00)
                .setOrigin(0, 0)
                .setScrollFactor(0)
        };

        // Add exp text
        this.expBar.text = this.scene.add.text(
            x + width / 2,
            y + height / 2,
            '0/100',
            {
                fontSize: '12px',
                fill: '#ffffff'
            }
        )
        .setOrigin(0.5)
        .setScrollFactor(0);
    }

    createScoreAndLevel() {
        const padding = 10;
        
        // Score text
        this.scoreText = this.scene.add.text(
            this.scene.game.config.width - padding,
            padding,
            'Score: 0',
            {
                fontSize: '24px',
                fill: '#ffffff'
            }
        )
        .setOrigin(1, 0)
        .setScrollFactor(0);

        // Level text
        this.levelText = this.scene.add.text(
            this.scene.game.config.width - padding,
            padding + 30,
            'Level: 1',
            {
                fontSize: '24px',
                fill: '#ffffff'
            }
        )
        .setOrigin(1, 0)
        .setScrollFactor(0);
    }

    createTimeDisplay() {
        const padding = 10;
        
        this.timeText = this.scene.add.text(
            this.scene.game.config.width / 2,
            padding,
            '00:00',
            {
                fontSize: '32px',
                fill: '#ffffff'
            }
        )
        .setOrigin(0.5, 0)
        .setScrollFactor(0);
    }

    updateHealthBar() {
        const player = this.scene.player;
        if (!player) return;

        const health = player.getData('health');
        const maxHealth = player.getData('maxHealth');
        const width = this.healthBar.background.width;
        
        this.healthBar.bar.width = (health / maxHealth) * width;
        this.healthBar.text.setText(`${Math.ceil(health)}/${maxHealth}`);
    }

    updateExpBar() {
        const player = this.scene.player;
        if (!player) return;

        const experience = player.getData('experience');
        const nextLevelExp = player.getData('nextLevelExp');
        const width = this.expBar.background.width;
        
        this.expBar.bar.width = (experience / nextLevelExp) * width;
        this.expBar.text.setText(`${experience}/${nextLevelExp}`);
    }

    updateScoreAndLevel() {
        const player = this.scene.player;
        if (!player) return;

        this.scoreText.setText(`Score: ${this.scene.score}`);
        this.levelText.setText(`Level: ${player.getData('level')}`);
    }

    updateTimeDisplay() {
        const minutes = Math.floor(this.scene.gameTime / 60);
        const seconds = this.scene.gameTime % 60;
        this.timeText.setText(
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
    }

    showLevelUpEffect() {
        const centerX = this.scene.game.config.width / 2;
        const centerY = this.scene.game.config.height / 2;

        const text = this.scene.add.text(
            centerX,
            centerY,
            'LEVEL UP!',
            {
                fontSize: '64px',
                fill: '#ffff00',
                stroke: '#000000',
                strokeThickness: 6
            }
        )
        .setOrigin(0.5)
        .setScrollFactor(0)
        .setAlpha(0);

        this.scene.tweens.add({
            targets: text,
            alpha: 1,
            y: centerY - 100,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                this.scene.tweens.add({
                    targets: text,
                    alpha: 0,
                    duration: 500,
                    delay: 500,
                    onComplete: () => {
                        text.destroy();
                    }
                });
            }
        });
    }

    cleanup() {
        // Destroy all UI elements
        if (this.healthBar) {
            this.healthBar.background.destroy();
            this.healthBar.bar.destroy();
            this.healthBar.text.destroy();
        }
        
        if (this.expBar) {
            this.expBar.background.destroy();
            this.expBar.bar.destroy();
            this.expBar.text.destroy();
        }
        
        if (this.scoreText) this.scoreText.destroy();
        if (this.levelText) this.levelText.destroy();
        if (this.timeText) this.timeText.destroy();
        if (this.levelUpMenu) this.levelUpMenu.destroy();
    }
} 