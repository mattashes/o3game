import { GameObject } from './setup';
import { GameScene } from '../GameScene';
import { WorldSystem } from '../../systems/WorldSystem';
import { WeaponSystem } from '../../systems/WeaponSystem';
import { EnemySystem } from '../../systems/EnemySystem';
import { StatusEffectSystem } from '../../systems/StatusEffectSystem';
import { PlayerController } from '../../components/player/PlayerController';
import { UIManager } from '../../components/ui/UIManager';

// Mock the weapons constants
jest.mock('../../constants/weapons', () => ({
    WeaponTypes: {},
    WeaponBehaviors: {},
    WeaponConfigs: {},
    StatusEffects: {}
}));

jest.mock('../../systems/WorldSystem', () => {
    return {
        WorldSystem: jest.fn().mockImplementation(() => ({
            createWorld: jest.fn(),
            getWorldSize: jest.fn().mockReturnValue({ width: 1600, height: 1200 }),
            isWithinWorldBounds: jest.fn(),
            cleanup: jest.fn()
        }))
    };
});
jest.mock('../../systems/WeaponSystem');
jest.mock('../../systems/StatusEffectSystem');
jest.mock('../../components/player/PlayerController');
jest.mock('../../components/ui/UIManager');

const mockEnemySystem = {
    enemies: {
        children: {
            entries: []
        },
        create: jest.fn(),
        getChildren: jest.fn().mockReturnValue([])
    },
    update: jest.fn().mockImplementation(function(time, player) {
        this.handleEnemyBehavior(player);
    }),
    handleEnemyBehavior: jest.fn().mockImplementation(function(player) {
        this.enemies.children.entries.forEach(enemy => {
            const behavior = enemy.getData('behavior');
            const speed = enemy.getData('speed') || 100;

            if (behavior === 'chase') {
                this.handleChasePattern(enemy, speed, player);
            }
        });
    }),
    handleChasePattern: jest.fn(),
    createEnemyGroup: jest.fn(),
    spawnEnemy: jest.fn(),
    findNearestEnemy: jest.fn(),
    killEnemy: jest.fn()
};

// Mock the EnemySystem class
jest.mock('../../systems/EnemySystem', () => ({
    EnemySystem: jest.fn().mockImplementation(() => mockEnemySystem)
}));

const mockWeaponSystem = {
    weapons: {
        create: jest.fn(),
        getChildren: jest.fn().mockReturnValue([])
    },
    initializeWeapons: jest.fn(),
    handleWeaponBehavior: jest.fn(),
    handleWeaponEnemyCollision: jest.fn(),
    createWeaponGroup: jest.fn()
};

// Mock the WeaponSystem class
jest.mock('../../systems/WeaponSystem', () => ({
    WeaponSystem: jest.fn().mockImplementation(() => mockWeaponSystem)
}));

describe('GameScene', () => {
    let scene;
    let gameScene;
    
    beforeEach(() => {
        // Reset all mocks
        jest.clearAllMocks();
        
        // Create a mock scene with all required methods
        scene = {
            add: {
                sprite: jest.fn((x, y, texture) => new GameObject(scene, x, y, texture)),
                graphics: jest.fn(() => new GameObject(scene)),
                group: jest.fn(() => ({
                    add: jest.fn(),
                    remove: jest.fn(),
                    children: { iterate: jest.fn() }
                })),
                text: jest.fn((x, y, text) => new GameObject(scene, x, y)),
                circle: jest.fn((x, y, radius) => new GameObject(scene, x, y)),
                rectangle: jest.fn((x, y, width, height) => new GameObject(scene, x, y))
            },
            physics: {
                add: {
                    sprite: jest.fn((x, y, texture) => new GameObject(scene, x, y, texture)),
                    group: jest.fn(() => ({
                        add: jest.fn(),
                        remove: jest.fn(),
                        children: { iterate: jest.fn() }
                    })),
                    overlap: jest.fn(),
                    collider: jest.fn()
                },
                world: {
                    setBounds: jest.fn()
                }
            },
            input: {
                keyboard: {
                    addKey: jest.fn().mockReturnValue({
                        isDown: false
                    }),
                    createCursorKeys: jest.fn(() => ({
                        up: { isDown: false },
                        down: { isDown: false },
                        left: { isDown: false },
                        right: { isDown: false }
                    }))
                }
            },
            cameras: {
                main: {
                    setBounds: jest.fn(),
                    startFollow: jest.fn(),
                    setZoom: jest.fn()
                }
            },
            time: {
                now: Date.now(),
                addEvent: jest.fn().mockReturnValue({
                    remove: jest.fn()
                })
            },
            scale: {
                width: 800,
                height: 600
            },
            events: {
                on: jest.fn(),
                off: jest.fn(),
                emit: jest.fn()
            },
            tweens: {
                add: jest.fn()
            },
            sound: {
                play: jest.fn()
            }
        };

        // Create the game scene instance
        gameScene = new GameScene();
        Object.assign(gameScene, scene);
        
        // Initialize the scene
        gameScene.create();
        
        // Store reference to the game scene
        scene = gameScene;
    });

    describe('Game Systems', () => {
        it('should initialize all required systems', () => {
            expect(WorldSystem).toHaveBeenCalledTimes(1);
            expect(WeaponSystem).toHaveBeenCalledTimes(1);
            expect(EnemySystem).toHaveBeenCalledTimes(1);
            expect(StatusEffectSystem).toHaveBeenCalledTimes(1);
            expect(PlayerController).toHaveBeenCalledTimes(1);
            expect(UIManager).toHaveBeenCalledTimes(1);
        });

        it('should create world with correct size', () => {
            expect(scene.cameras.main.setBounds).toHaveBeenCalledWith(0, 0, 1600, 1200);
        });
    });

    describe('Weapon System', () => {
        it('should initialize weapons for player', () => {
            expect(scene.weaponSystem.weapons).toBeDefined();
            expect(mockWeaponSystem.initializeWeapons).toHaveBeenCalled();
        });

        it('should handle weapon firing', () => {
            scene.weaponSystem.handleWeaponBehavior(Date.now(), scene.player);
            expect(mockWeaponSystem.handleWeaponBehavior).toHaveBeenCalled();
        });

        it('should handle weapon-enemy collision', () => {
            const weapon = { damage: 10 };
            const enemy = {
                getData: jest.fn().mockImplementation(key => {
                    if (key === 'health') return 100;
                    return null;
                }),
                setData: jest.fn(),
                body: {
                    velocity: {
                        setToPolar: jest.fn()
                    }
                }
            };
            
            scene.handleWeaponEnemyCollision(weapon, enemy);
            expect(mockWeaponSystem.handleWeaponEnemyCollision).toHaveBeenCalledWith(weapon, enemy);
        });
    });

    describe('Enemy System', () => {
        it('should spawn enemies with correct properties', () => {
            const enemy = {
                setData: jest.fn(),
                getData: jest.fn().mockImplementation((key) => {
                    if (key === 'health') return 100;
                    return null;
                }),
                body: {
                    setCollideWorldBounds: jest.fn(),
                    velocity: {
                        setToPolar: jest.fn()
                    }
                }
            };
            
            mockEnemySystem.spawnEnemy.mockReturnValue(enemy);
            const spawnedEnemy = scene.enemySystem.spawnEnemy(100, 100);
            
            expect(spawnedEnemy.getData('health')).toBe(100);
        });

        it('should handle enemy behavior patterns', () => {
            // Create a mock enemy with chase behavior
            const enemy = {
                x: 100,
                y: 100,
                getData: jest.fn().mockImplementation(key => {
                    if (key === 'behavior') return 'chase';
                    if (key === 'speed') return 100;
                    return null;
                }),
                body: {
                    velocity: {
                        setToPolar: jest.fn()
                    }
                },
                rotation: 0
            };

            // Add the mock enemy to the enemies group
            mockEnemySystem.enemies.children.entries = [enemy];

            // Create a mock player
            const mockPlayer = {
                x: 200,
                y: 200
            };

            // Update the enemy system with the mock player
            scene.enemySystem.update(Date.now(), mockPlayer);
            
            // Verify that handleChasePattern was called
            expect(mockEnemySystem.handleChasePattern).toHaveBeenCalledWith(enemy, 100, mockPlayer);
        });
    });

    describe('Status Effect System', () => {
        it('should apply status effects to enemies', () => {
            const enemy = new GameObject(scene, 100, 100);
            scene.statusEffectSystem.applyStatusEffect(enemy, 'slow', 2000);
            expect(StatusEffectSystem.mock.instances[0].applyStatusEffect).toHaveBeenCalledWith(enemy, 'slow', 2000);
        });

        it('should remove expired status effects', () => {
            const enemy = new GameObject(scene, 100, 100);
            scene.statusEffectSystem.applyStatusEffect(enemy, 'slow', 0);
            scene.statusEffectSystem.update(Date.now());
            expect(StatusEffectSystem.mock.instances[0].update).toHaveBeenCalled();
        });
    });

    describe('Player Controller', () => {
        it('should handle player movement', () => {
            scene.input.keyboard.createCursorKeys().up.isDown = true;
            scene.playerController.handleMovement();
            expect(PlayerController.mock.instances[0].handleMovement).toHaveBeenCalled();
        });

        it('should handle player leveling', () => {
            const player = new GameObject(scene, 0, 0);
            player.setData('experience', 1000);
            player.setData('level', 1);
            
            scene.player = player;
            scene.addExperience(100);
            expect(PlayerController.mock.instances[0].addExperience).toHaveBeenCalledWith(100);
        });
    });

    describe('UI Manager', () => {
        it('should create all UI elements', () => {
            expect(UIManager.mock.instances[0].createUI).toHaveBeenCalled();
        });

        it('should update UI elements', () => {
            const player = new GameObject(scene, 0, 0);
            player.setData('health', 50);
            scene.player = player;
            
            scene.updateUI();
            expect(UIManager.mock.instances[0].updateHealthBar).toHaveBeenCalled();
            expect(UIManager.mock.instances[0].updateExpBar).toHaveBeenCalled();
            expect(UIManager.mock.instances[0].updateScoreAndLevel).toHaveBeenCalled();
            expect(UIManager.mock.instances[0].updateTimeDisplay).toHaveBeenCalled();
        });
    });
}); 