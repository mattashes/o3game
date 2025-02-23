export class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Add background
        this.add.rectangle(0, 0, width, height, 0x000000).setOrigin(0);

        // Add title
        const title = this.add.text(width / 2, height / 4, 'O3Game', {
            font: '64px monospace',
            fill: '#ffffff',
            stroke: '#6f1b1b',
            strokeThickness: 6
        });
        title.setOrigin(0.5);

        // Add subtitle
        const subtitle = this.add.text(width / 2, height / 4 + 50, 'A Vampire Survivors Clone', {
            font: '24px monospace',
            fill: '#cccccc'
        });
        subtitle.setOrigin(0.5);

        // Create menu buttons
        this.createButton(width / 2, height / 2, 'Start Game', () => {
            this.scene.start('GameScene');
        });

        this.createButton(width / 2, height / 2 + 60, 'Character Select', () => {
            // TODO: Implement character selection
            console.log('Character selection not implemented yet');
        });

        this.createButton(width / 2, height / 2 + 120, 'Options', () => {
            // TODO: Implement options menu
            console.log('Options menu not implemented yet');
        });

        // Add version text
        const version = this.add.text(width - 10, height - 10, 'v1.0.0', {
            font: '16px monospace',
            fill: '#666666'
        });
        version.setOrigin(1);
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