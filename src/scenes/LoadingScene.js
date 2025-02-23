export class LoadingScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LoadingScene' });
        this.loadingBar = null;
        this.loadingText = null;
        this.progressValue = 0;
        this.failedAssets = new Set();
        this.assetsLoaded = {
            characters: false,
            environment: false,
            weapons: false,
            ui: false
        };
    }

    preload() {
        this.createLoadingBar();
        this.setupLoadingEvents();
        this.loadAllAssets();
    }

    createLoadingBar() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        this.loadingBar = this.add.graphics();
        this.loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading...', {
            font: '24px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Initial loading bar state
        this.updateLoadingBar();
    }

    setupLoadingEvents() {
        // Progress bar update
        this.load.on('progress', (value) => {
            this.progressValue = value;
            this.updateLoadingBar();
            console.log('Loading progress:', value * 100, '%');
        });

        // Asset load error handling
        this.load.on('loaderror', (file) => {
            console.error('Asset load error:', {
                key: file.key,
                url: file.url,
                type: file.type,
                path: file.path,
                error: file.error
            });
            this.handleLoadError(file);
            this.updateLoadingBar();
        });

        // Loading complete
        this.load.on('complete', () => {
            console.log('All assets loaded successfully');
            console.log('Failed assets:', Array.from(this.failedAssets));
            this.handleLoadComplete();
        });

        // Track individual asset loads
        this.load.on('filecomplete', (key, type, data) => {
            console.log('Asset loaded successfully:', {
                key: key,
                type: type,
                dimensions: data instanceof HTMLImageElement ? `${data.width}x${data.height}` : 'N/A'
            });
            if (key.includes('weapon') || type === 'weapon') {
                this.assetsLoaded.weapons = true;
            } else if (key.includes('ground') || type === 'environment') {
                this.assetsLoaded.environment = true;
            } else if (key.includes('button') || key.includes('panel')) {
                this.assetsLoaded.ui = true;
            }
            this.updateLoadingBar();
        });
    }

    handleLoadError(file) {
        const { key, type, url } = file;
        this.failedAssets.add(key);

        // Log appropriate error message based on asset type
        if (type === 'image') {
            if (url.includes('weapons')) {
                console.error(`Failed to load weapon sprite: ${key}`);
            } else if (url.includes('environment')) {
                console.error(`Failed to load ground tile: ${key}`);
            } else if (url.includes('ui')) {
                console.error(`Failed to load UI element: ${key}`);
            } else {
                console.error(`Failed to load image: ${key}`);
            }
        } else {
            console.error(`Failed to load asset: ${key} (${type})`);
        }
    }

    updateLoadingBar() {
        if (!this.loadingBar || !this.loadingText) {
            return;
        }

        this.loadingBar.clear();
        
        // Draw background
        this.loadingBar.fillStyle(0xffffff, 1);
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const barWidth = width * 0.8;
        const barHeight = 20;
        
        this.loadingBar.fillRect(
            width * 0.1,
            height / 2,
            barWidth,
            barHeight
        );
        
        // Draw progress
        this.loadingBar.fillStyle(0x00ff00, 1);
        this.loadingBar.fillRect(
            width * 0.1,
            height / 2,
            barWidth * this.progressValue,
            barHeight
        );

        // Update loading text with failed assets count
        const text = this.failedAssets.size > 0 
            ? `Loading... (${this.failedAssets.size} assets failed)`
            : 'Loading...';
        this.loadingText.setText(text);
    }

    handleLoadComplete() {
        if (this.failedAssets.size > 0) {
            console.warn(`Loading completed with ${this.failedAssets.size} failed assets`);
        }
        
        // Create animations before proceeding
        this.createAnimations();
        
        // Clean up
        if (this.loadingBar) {
            this.loadingBar.destroy();
        }
        if (this.loadingText) {
            this.loadingText.destroy();
        }
        
        // Proceed to menu scene even if some assets failed
        this.scene.start('MenuScene');
    }

    loadAllAssets() {
        this.loadCharacterAssets();
        this.loadWeaponAssets();
        this.loadMapAssets();
        this.loadUIAssets();
    }

    loadCharacterAssets() {
        console.log('Loading character assets...');
        
        // Player character - Wizard
        // Idle sprite sheet is 128x32 (4 frames)
        this.load.spritesheet('wizard_idle', 
            '/assets/sprites/characters/Heroes/Wizzard/Idle/Idle-Sheet.png',
            { 
                frameWidth: 32, 
                frameHeight: 32,
                startFrame: 0,
                endFrame: 3
            }
        );
        // Run sprite sheet is 192x32 (6 frames)
        this.load.spritesheet('wizard_run',
            '/assets/sprites/characters/Heroes/Wizzard/Run/Run-Sheet.png',
            { 
                frameWidth: 32, 
                frameHeight: 32,
                startFrame: 0,
                endFrame: 5
            }
        );
        // Death sprite sheet is 160x32 (5 frames)
        this.load.spritesheet('wizard_death',
            '/assets/sprites/characters/Heroes/Wizzard/Death/Death-Sheet.png',
            { 
                frameWidth: 32, 
                frameHeight: 32,
                startFrame: 0,
                endFrame: 4
            }
        );

        // Enemy characters - Skeleton Base
        // Idle sprite sheet is 128x32 (4 frames)
        this.load.spritesheet('skeleton_idle',
            encodeURI('/assets/sprites/characters/Enemy/Skeleton Crew/Skeleton - Base/Idle/Idle-Sheet.png'),
            { 
                frameWidth: 32, 
                frameHeight: 32,
                startFrame: 0,
                endFrame: 3
            }
        );
        // Run sprite sheet is 192x32 (6 frames)
        this.load.spritesheet('skeleton_run',
            encodeURI('/assets/sprites/characters/Enemy/Skeleton Crew/Skeleton - Base/Run/Run-Sheet.png'),
            { 
                frameWidth: 32, 
                frameHeight: 32,
                startFrame: 0,
                endFrame: 5
            }
        );
        // Death sprite sheet is 160x32 (5 frames)
        this.load.spritesheet('skeleton_death',
            encodeURI('/assets/sprites/characters/Enemy/Skeleton Crew/Skeleton - Base/Death/Death-Sheet.png'),
            { 
                frameWidth: 32, 
                frameHeight: 32,
                startFrame: 0,
                endFrame: 4
            }
        );
    }

    loadWeaponAssets() {
        // Load the wood weapon sprite sheet
        this.load.spritesheet('weapons',
            '/assets/sprites/weapons/Wood/Wood.png',
            { frameWidth: 32, frameHeight: 32 }
        );
    }

    loadMapAssets() {
        // Load tileset images
        this.load.image('dungeon_tiles', '/assets/sprites/environment/tiles/dungeon.png');
        this.load.image('grass_tiles', '/assets/sprites/environment/tiles/grass.png');
        this.load.image('castle_tiles', '/assets/sprites/environment/tiles/castlefloors.png');
    }

    loadUIAssets() {
        // Create UI graphics programmatically for now
        const graphics = this.add.graphics();
        
        // Create button texture
        graphics.fillStyle(0x4a4a4a);
        graphics.fillRect(0, 0, 200, 50);
        graphics.lineStyle(2, 0x000000);
        graphics.strokeRect(0, 0, 200, 50);
        graphics.generateTexture('button', 200, 50);
        graphics.clear();

        // Create panel texture
        graphics.fillStyle(0x2a2a2a, 0.8);
        graphics.fillRect(0, 0, 300, 200);
        graphics.lineStyle(2, 0x000000);
        graphics.strokeRect(0, 0, 300, 200);
        graphics.generateTexture('panel', 300, 200);
        graphics.clear();
        
        graphics.destroy();
    }

    create() {
        this.createAnimations();
        this.scene.start('MenuScene');
    }

    shutdown() {
        // Clean up resources
        if (this.loadingBar) {
            this.loadingBar.destroy();
            this.loadingBar = null;
        }
        if (this.loadingText) {
            this.loadingText.destroy();
            this.loadingText = null;
        }
        
        // Clear any event listeners
        this.load.off('progress');
        this.load.off('loaderror');
        this.load.off('complete');
        this.load.off('filecomplete');
    }

    createAnimations() {
        // Remove existing animations if they exist
        const existingAnims = ['wizard_idle_anim', 'wizard_run_anim', 'wizard_death_anim',
                              'skeleton_idle_anim', 'skeleton_run_anim', 'skeleton_death_anim'];
        
        existingAnims.forEach(key => {
            if (this.anims.exists(key)) {
                this.anims.remove(key);
            }
        });

        // Create wizard animations
        this.anims.create({
            key: 'wizard_idle_anim',
            frames: this.anims.generateFrameNumbers('wizard_idle', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'wizard_run_anim',
            frames: this.anims.generateFrameNumbers('wizard_run', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'wizard_death_anim',
            frames: this.anims.generateFrameNumbers('wizard_death', { start: 0, end: 4 }),
            frameRate: 8,
            repeat: 0
        });

        // Create skeleton animations
        this.anims.create({
            key: 'skeleton_idle_anim',
            frames: this.anims.generateFrameNumbers('skeleton_idle', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'skeleton_run_anim',
            frames: this.anims.generateFrameNumbers('skeleton_run', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'skeleton_death_anim',
            frames: this.anims.generateFrameNumbers('skeleton_death', { start: 0, end: 4 }),
            frameRate: 8,
            repeat: 0
        });

        console.log('Animations created successfully');
    }
} 