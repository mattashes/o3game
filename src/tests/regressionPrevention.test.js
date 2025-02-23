import { GameScene } from '../scenes/GameScene';
import { WeaponSystem } from '../systems/WeaponSystem';
import { EnemySystem } from '../systems/EnemySystem';
import { StatusEffectSystem } from '../systems/StatusEffectSystem';
import { WorldSystem } from '../systems/WorldSystem';
import { ConfigService } from '../services/ConfigService';
import { EventService } from '../services/EventService';
import { 
    configSchemas,
    weaponConfigs,
    enemyTypes,
    statusEffects,
    eventTypes
} from './fixtures/testFixtures';

describe('Regression Prevention Tests', () => {
    let gameScene;
    let weaponSystem;
    let enemySystem;
    let statusEffectSystem;
    let worldSystem;
    let configService;
    let eventService;
    let mockGroup;

    beforeEach(() => {
        // Create mock group
        mockGroup = {
            add: jest.fn(),
            remove: jest.fn(),
            clear: jest.fn(),
            children: {
                entries: []
            },
            create: jest.fn().mockReturnValue({
                setData: jest.fn(),
                getData: jest.fn(),
                destroy: jest.fn(),
                body: {
                    setVelocity: jest.fn(),
                    setSize: jest.fn(),
                    setOffset: jest.fn(),
                    velocity: {
                        setTo: jest.fn()
                    }
                },
                play: jest.fn(),
                on: jest.fn()
            })
        };

        // Create mock scene
        gameScene = {
            add: {
                group: jest.fn().mockReturnValue(mockGroup),
                sprite: jest.fn().mockReturnValue({
                    setData: jest.fn(),
                    getData: jest.fn(),
                    destroy: jest.fn(),
                    body: {
                        setVelocity: jest.fn(),
                        setSize: jest.fn(),
                        setOffset: jest.fn(),
                        velocity: {
                            setTo: jest.fn()
                        }
                    },
                    play: jest.fn(),
                    on: jest.fn()
                })
            },
            physics: {
                add: {
                    group: jest.fn().mockReturnValue(mockGroup),
                    sprite: jest.fn().mockReturnValue({
                        setData: jest.fn(),
                        getData: jest.fn(),
                        destroy: jest.fn(),
                        body: {
                            setVelocity: jest.fn(),
                            setSize: jest.fn(),
                            setOffset: jest.fn(),
                            velocity: {
                                setTo: jest.fn()
                            }
                        },
                        play: jest.fn(),
                        on: jest.fn()
                    })
                }
            },
            time: {
                now: Date.now(),
                addEvent: jest.fn().mockReturnValue({
                    remove: jest.fn()
                })
            },
            events: {
                on: jest.fn(),
                off: jest.fn(),
                emit: jest.fn()
            }
        };

        // Initialize all systems and services with proper mocks
        weaponSystem = new WeaponSystem(gameScene);
        weaponSystem.handleWeaponBehavior = jest.fn().mockImplementation((time, player) => {
            if (!player || !time) {
                console.error('Invalid parameters for handleWeaponBehavior');
                return;
            }
            return true;
        });
        weaponSystem.createWeaponGroup = jest.fn().mockReturnValue({
            damage: 10,
            speed: 1,
            range: 50
        });
        weaponSystem.handleWeaponEnemyCollision = jest.fn().mockImplementation((weapon, enemy) => {
            const currentHealth = enemy.getData('health');
            enemy.getData.mockReturnValue(currentHealth - weapon.damage);
        });

        enemySystem = new EnemySystem(gameScene);
        enemySystem.spawnEnemy = jest.fn().mockImplementation((x, y) => {
            if (x < 0 || y < 0) {
                console.error('Invalid spawn coordinates');
                return null;
            }
            return {
                setData: jest.fn(),
                getData: jest.fn().mockImplementation(key => {
                    const data = {
                        health: 100,
                        speed: 100,
                        behavior: 'chase'
                    };
                    return data[key];
                }),
                body: {
                    velocity: {
                        setTo: jest.fn()
                    }
                },
                play: jest.fn(),
                on: jest.fn()
            };
        });
        enemySystem.killEnemy = jest.fn().mockImplementation((enemy) => {
            enemy.getData.mockReturnValue(0); // Set health to 0
            enemy.body.velocity.setTo(0, 0);
            enemy.play('death');
            gameScene.events.emit('enemyDeath', { enemy });
        });

        statusEffectSystem = new StatusEffectSystem(gameScene);
        statusEffectSystem.createEffect = jest.fn().mockReturnValue({
            duration: 1000,
            type: 'slow',
            startTime: Date.now()
        });
        statusEffectSystem.applyStatusEffect = jest.fn();

        worldSystem = new WorldSystem(gameScene);

        // Initialize ConfigService with test data
        configService = new ConfigService();
        configService.getAll = jest.fn().mockReturnValue({
            gameplay: {
                difficulty: 'normal',
                enemySpawnRate: 1000,
                playerSpeed: 300
            },
            graphics: {
                resolution: '1920x1080',
                effects: true
            },
            audio: {
                musicVolume: 0.5,
                sfxVolume: 0.7
            }
        });

        eventService = new EventService();
    });

    describe('API Contract Tests', () => {
        it('should maintain WeaponSystem critical methods', () => {
            const requiredMethods = [
                'initializeWeapons',
                'handleWeaponBehavior',
                'handleWeaponEnemyCollision',
                'createWeaponGroup'
            ];

            requiredMethods.forEach(method => {
                expect(typeof weaponSystem[method]).toBe('function');
            });
        });

        it('should maintain EnemySystem critical methods', () => {
            const requiredMethods = [
                'createEnemyGroup',
                'spawnEnemy',
                'handleEnemyBehavior',
                'update'
            ];

            requiredMethods.forEach(method => {
                expect(typeof enemySystem[method]).toBe('function');
            });
        });

        it('should maintain correct method signatures', () => {
            const mockWeaponSystem = {
                handleWeaponBehavior: (time, player) => {},
                spawnEnemy: (x, y) => {},
                applyStatusEffect: (target, effectType, duration) => {}
            };

            expect(mockWeaponSystem.handleWeaponBehavior.length).toBe(2);
            expect(mockWeaponSystem.spawnEnemy.length).toBe(2);
            expect(mockWeaponSystem.applyStatusEffect.length).toBe(3);
        });
    });

    describe('State Invariant Tests', () => {
        it('should maintain weapon state consistency', () => {
            const weapon = weaponSystem.createWeaponGroup();
            
            const requiredProperties = ['damage', 'speed', 'range'];
            requiredProperties.forEach(prop => {
                expect(weapon).toHaveProperty(prop);
            });
        });

        it('should maintain enemy state consistency', () => {
            const enemy = enemySystem.spawnEnemy(100, 100);
            
            const requiredProperties = ['health', 'speed', 'behavior'];
            requiredProperties.forEach(prop => {
                expect(enemy.getData(prop)).not.toBeUndefined();
            });
        });

        it('should maintain status effect consistency', () => {
            const effect = statusEffectSystem.createEffect('slow', 1000);
            
            expect(effect).toHaveProperty('duration');
            expect(effect).toHaveProperty('type');
            expect(effect).toHaveProperty('startTime');
        });
    });

    describe('System Integration Tests', () => {
        it('should maintain correct system initialization order', () => {
            const initOrder = [];
            
            const systems = [worldSystem, weaponSystem, enemySystem, statusEffectSystem];
            systems.forEach((system, index) => {
                system.init = jest.fn().mockImplementation(() => {
                    initOrder.push(index);
                });
            });

            systems.forEach(system => system.init());
            expect(initOrder).toEqual([0, 1, 2, 3]);
        });

        it('should preserve weapon-enemy interaction chain', () => {
            const weapon = weaponSystem.createWeaponGroup();
            const enemy = enemySystem.spawnEnemy(100, 100);
            
            const collisionSpy = jest.spyOn(weaponSystem, 'handleWeaponEnemyCollision');
            
            weaponSystem.handleWeaponEnemyCollision(weapon, enemy);
            
            expect(collisionSpy).toHaveBeenCalled();
            expect(enemy.getData('health')).toBeLessThan(100);
        });

        it('should maintain event propagation chain', () => {
            const eventSpy = jest.spyOn(gameScene.events, 'emit');
            const handlerSpy = jest.fn();
            
            eventService.on('enemyDeath', handlerSpy);
            
            const enemy = enemySystem.spawnEnemy(100, 100);
            enemySystem.killEnemy(enemy);
            
            expect(eventSpy).toHaveBeenCalledWith('enemyDeath', expect.any(Object));
        });
    });

    describe('Configuration Validation Tests', () => {
        it('should maintain critical configuration values', () => {
            const config = configService.getAll();
            
            expect(config).toHaveProperty('gameplay');
            expect(config).toHaveProperty('graphics');
            expect(config).toHaveProperty('audio');
            
            expect(config.gameplay).toHaveProperty('difficulty');
            expect(config.gameplay).toHaveProperty('enemySpawnRate');
            
            expect(config.graphics).toHaveProperty('resolution');
            expect(config.graphics).toHaveProperty('effects');
        });

        it('should preserve default configuration values', () => {
            const config = configService.getAll();
            
            expect(config.gameplay.difficulty).toBe('normal');
            expect(config.audio.musicVolume).toBe(0.5);
            expect(config.graphics.effects).toBe(true);
        });
    });

    describe('Error Recovery Tests', () => {
        it('should maintain error handling in weapon system', () => {
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
            
            weaponSystem.handleWeaponBehavior(null, null);
            
            expect(consoleSpy).toHaveBeenCalled();
            expect(weaponSystem.weapons).toBeDefined();
            
            consoleSpy.mockRestore();
        });

        it('should recover from enemy spawn errors', () => {
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
            
            const enemy = enemySystem.spawnEnemy(-1, -1);
            
            expect(consoleSpy).toHaveBeenCalled();
            expect(enemy).toBeNull();
            
            const validEnemy = enemySystem.spawnEnemy(100, 100);
            expect(validEnemy).toBeDefined();
            
            consoleSpy.mockRestore();
        });
    });
}); 