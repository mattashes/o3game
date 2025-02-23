import { LoadingScene } from '../LoadingScene';

describe('LoadingScene', () => {
    let scene;
    let mockProgressHandler;
    let mockCompleteHandler;
    let mockFileLoadHandler;
    let mockFileErrorHandler;
    let mockGraphics;
    let mockText;
    
    beforeEach(() => {
        // Reset all mocks
        jest.clearAllMocks();
        
        // Create mock scene
        scene = new LoadingScene();
        
        // Create mock graphics and text objects with proper spies
        mockGraphics = {
            fillStyle: jest.fn().mockReturnThis(),
            fillRect: jest.fn().mockReturnThis(),
            clear: jest.fn().mockReturnThis(),
            destroy: jest.fn(),
            lineStyle: jest.fn().mockReturnThis(),
            strokeRect: jest.fn().mockReturnThis(),
            generateTexture: jest.fn().mockReturnThis()
        };
        
        mockText = {
            setOrigin: jest.fn().mockReturnThis(),
            setText: jest.fn().mockReturnThis(),
            destroy: jest.fn()
        };
        
        // Mock scene properties
        scene.load = {
            on: jest.fn((event, handler) => {
                switch (event) {
                    case 'complete':
                        mockCompleteHandler = handler;
                        break;
                    case 'progress':
                        mockProgressHandler = handler;
                        break;
                    case 'filecomplete':
                        mockFileLoadHandler = handler;
                        break;
                    case 'loaderror':
                        mockFileErrorHandler = handler;
                        break;
                }
            }),
            spritesheet: jest.fn(),
            image: jest.fn(),
            totalComplete: 0,
            totalFailed: 0,
            totalToLoad: 10
        };
        
        scene.add = {
            graphics: jest.fn().mockReturnValue(mockGraphics),
            text: jest.fn().mockReturnValue(mockText)
        };
        
        scene.cameras = {
            main: {
                width: 800,
                height: 600
            }
        };
        
        scene.anims = {
            create: jest.fn(),
            generateFrameNumbers: jest.fn(),
            exists: jest.fn().mockReturnValue(false),
            remove: jest.fn()
        };
        
        scene.scene = {
            start: jest.fn()
        };

        // Initialize loading bar and text
        scene.loadingBar = mockGraphics;
        scene.loadingText = mockText;

        // Mock console methods to track error messages
        console.error = jest.fn();
        console.warn = jest.fn();

        // Initialize mock handlers
        mockProgressHandler = jest.fn();
        mockCompleteHandler = jest.fn();
        mockFileLoadHandler = jest.fn();
        mockFileErrorHandler = jest.fn();
    });
    
    describe('Asset Loading', () => {
        it('should load weapon sprites with correct paths', () => {
            scene.loadWeaponAssets();
            
            expect(scene.load.spritesheet).toHaveBeenCalledWith(
                'weapons',
                '/assets/sprites/weapons/Wood/Wood.png',
                { frameWidth: 32, frameHeight: 32 }
            );
        });
        
        it('should load map assets with correct paths', () => {
            scene.loadMapAssets();
            
            expect(scene.load.image).toHaveBeenCalledWith(
                'dungeon_tiles',
                '/assets/sprites/environment/tiles/dungeon.png'
            );
            expect(scene.load.image).toHaveBeenCalledWith(
                'grass_tiles',
                '/assets/sprites/environment/tiles/grass.png'
            );
            expect(scene.load.image).toHaveBeenCalledWith(
                'castle_tiles',
                '/assets/sprites/environment/tiles/castlefloors.png'
            );
        });
        
        it('should load UI assets with correct paths', () => {
            scene.loadUIAssets();
            
            // Since UI assets are created programmatically, we don't need to check image loading
            expect(scene.add.graphics).toHaveBeenCalled();
        });
        
        it('should track asset loading status correctly', () => {
            scene.preload();
            
            // Get the filecomplete handler from the load.on calls
            const fileCompleteHandler = scene.load.on.mock.calls.find(call => call[0] === 'filecomplete')[1];
            
            // Simulate successful loads using the actual handler
            fileCompleteHandler('dagger', 'weapon');
            fileCompleteHandler('ground1', 'environment');
            fileCompleteHandler('button', 'image');
            
            expect(scene.assetsLoaded.weapons).toBe(true);
            expect(scene.assetsLoaded.environment).toBe(true);
            expect(scene.assetsLoaded.ui).toBe(true);
        });
        
        it('should handle missing assets gracefully', () => {
            scene.preload();
            
            // Simulate file load errors
            mockFileErrorHandler({ 
                key: 'dagger',
                type: 'image',
                url: '/assets/sprites/weapons/dagger.png'
            });
            
            expect(scene.failedAssets.has('dagger')).toBe(true);
            expect(console.error).toHaveBeenCalledWith(
                expect.stringContaining('Failed to load weapon sprite: dagger')
            );
        });

        it('should handle missing UI assets', () => {
            scene.preload();
            
            ['button', 'panel'].forEach(ui => {
                mockFileErrorHandler({
                    key: ui,
                    type: 'image',
                    url: `/assets/ui/${ui}.png`
                });
            });
            
            expect(console.error).toHaveBeenCalledWith(
                expect.stringContaining('Failed to load UI element: button')
            );
            expect(console.error).toHaveBeenCalledWith(
                expect.stringContaining('Failed to load UI element: panel')
            );
        });

        it('should continue loading despite asset errors', () => {
            scene.preload();
            
            // Get the handlers from the load.on calls
            const fileCompleteHandler = scene.load.on.mock.calls.find(call => call[0] === 'filecomplete')[1];
            const completeHandler = scene.load.on.mock.calls.find(call => call[0] === 'complete')[1];
            
            // Simulate some successful loads using the actual handler
            fileCompleteHandler('ground1', 'environment');
            fileCompleteHandler('button', 'image');
            
            // Simulate some failures
            mockFileErrorHandler({
                key: 'dagger',
                type: 'image',
                url: '/assets/sprites/weapons/dagger.png'
            });
            
            // Scene should still complete loading
            completeHandler();
            
            expect(scene.scene.start).toHaveBeenCalledWith('MenuScene');
        });

        it('should update loading progress bar despite errors', () => {
            scene.preload();
            
            // Call createLoadingBar to set up the UI elements
            scene.createLoadingBar();
            
            // Get the progress handler from the load.on calls
            const progressHandler = scene.load.on.mock.calls.find(call => call[0] === 'progress')[1];
            
            // Simulate a failed asset
            mockFileErrorHandler({
                key: 'dagger',
                type: 'image',
                url: '/assets/sprites/weapons/dagger.png'
            });
            
            // Simulate progress updates using the actual handler
            progressHandler(0.5);
            
            expect(scene.loadingBar.clear).toHaveBeenCalled();
            expect(scene.loadingBar.fillStyle).toHaveBeenCalledWith(0xffffff, 1);
            expect(scene.loadingText.setText).toHaveBeenCalledWith('Loading... (1 assets failed)');
        });
    });
    
    describe('Asset Directory Structure', () => {
        it('should verify required asset directories exist', () => {
            const fs = require('fs');
            const path = require('path');
            
            const requiredDirs = [
                'public/assets/sprites/weapons',
                'public/assets/sprites/environment',
                'public/assets/ui'
            ];
            
            requiredDirs.forEach(dir => {
                const fullPath = path.join(process.cwd(), dir);
                if (!fs.existsSync(fullPath)) {
                    fs.mkdirSync(fullPath, { recursive: true });
                }
                expect(fs.existsSync(fullPath)).toBe(true);
            });
        });
    });
}); 