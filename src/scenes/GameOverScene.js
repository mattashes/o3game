export class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.score = data.score || 0;
        this.level = data.level || 1;
        this.gameTime = data.gameTime || 0;
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Add dark overlay
        const overlay = this.add.graphics();
        overlay.fillStyle(0x000000, 0.8);
        overlay.fillRect(0, 0, width, height);

        // Add game over text
        const gameOverText = this.add.text(width / 2, height / 4, 'GAME OVER', {
            font: '64px monospace',
            fill: '#ff0000',
            stroke: '#000000',
            strokeThickness: 6
        });
        gameOverText.setOrigin(0.5);

        // Add stats
        const minutes = Math.floor(this.gameTime / 60);
        const seconds = this.gameTime % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        const statsText = this.add.text(width / 2, height / 2, [
            `Score: ${this.score}`,
            `Level: ${this.level}`,
            `Survival Time: ${timeString}`
        ], {
            font: '32px monospace',
            fill: '#ffffff',
            align: 'center',
            lineSpacing: 10
        });
        statsText.setOrigin(0.5);

        // Add buttons
        this.createButton(width / 2, height * 0.7, 'Try Again', () => {
            this.scene.start('GameScene');
        });

        this.createButton(width / 2, height * 0.8, 'Main Menu', () => {
            this.scene.start('MenuScene');
        });
    }

    createButton(x, y, text, callback) {
        const button = this.add.text(x, y, text, {
            font: '32px monospace',
            fill: '#ffffff'
        });
        
        button.setOrigin(0.5);
        button.setInteractive({ useHandCursor: true });
        
        button.on('pointerover', () => {
            button.setStyle({ fill: '#ff0000' });
        });
        
        button.on('pointerout', () => {
            button.setStyle({ fill: '#ffffff' });
        });
        
        button.on('pointerdown', () => {
            button.setStyle({ fill: '#880000' });
        });
        
        button.on('pointerup', () => {
            button.setStyle({ fill: '#ff0000' });
            callback();
        });

        return button;
    }
} 