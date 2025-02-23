import { jest } from '@jest/globals';
import { TextEncoder, TextDecoder } from 'util';

// Set up text encoder/decoder
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Import testing library after setting up globals
import '@testing-library/jest-dom';

// Mock requestAnimationFrame and cancelAnimationFrame
let nextFrameId = 0;
const timeouts = new Map();

const requestAnimationFrameMock = (callback) => {
    const frameId = ++nextFrameId;
    timeouts.set(frameId, setTimeout(() => {
        timeouts.delete(frameId);
        callback(performance.now());
    }, 0));
    return frameId;
};

const cancelAnimationFrameMock = (frameId) => {
    const timeout = timeouts.get(frameId);
    if (timeout) {
        clearTimeout(timeout);
        timeouts.delete(frameId);
    }
};

// Set up globals
Object.assign(global, {
    jest,
    expect,
    test,
    describe,
    beforeEach,
    afterEach,
    TextEncoder,
    TextDecoder,
    requestAnimationFrame: requestAnimationFrameMock,
    cancelAnimationFrame: cancelAnimationFrameMock
});

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
    length: 0,
    key: jest.fn()
};
global.localStorage = localStorageMock;

// Set up window object if it doesn't exist
if (!global.window) {
    global.window = {};
}

// Ensure these are also available on window
Object.defineProperty(global.window, 'requestAnimationFrame', {
    writable: true,
    value: requestAnimationFrameMock
});

Object.defineProperty(global.window, 'cancelAnimationFrame', {
    writable: true,
    value: cancelAnimationFrameMock
});

// Mock performance.now
if (!global.performance) {
    global.performance = {};
}
global.performance.now = jest.fn(() => Date.now());

// Mock console methods with jest spies
global.console = {
    ...console,
    log: jest.spyOn(console, 'log'),
    error: jest.spyOn(console, 'error'),
    warn: jest.spyOn(console, 'warn'),
    info: jest.spyOn(console, 'info'),
    debug: jest.spyOn(console, 'debug')
};

// Mock Phaser
class Game {
    constructor() {
        this.config = {};
        this.scene = {
            add: jest.fn(),
            start: jest.fn(),
            stop: jest.fn()
        };
    }
}

global.Phaser = {
    Game,
    Math: {
        Distance: {
            Between: jest.fn((x1, y1, x2, y2) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)))
        },
        Angle: {
            Between: jest.fn((x1, y1, x2, y2) => Math.atan2(y2 - y1, x2 - x1))
        }
    },
    Scene: class {
        constructor() {
            this.add = {
                sprite: jest.fn(),
                image: jest.fn(),
                text: jest.fn()
            };
            this.physics = {
                add: {
                    sprite: jest.fn(),
                    group: jest.fn()
                }
            };
            this.cameras = {
                main: {
                    startFollow: jest.fn()
                }
            };
        }
    }
};

export class Velocity {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    normalize() {
        const length = Math.sqrt(this.x * this.x + this.y * this.y);
        if (length > 0) {
            this.x /= length;
            this.y /= length;
        }
        return this;
    }

    scale(speed) {
        this.x *= speed;
        this.y *= speed;
        return this;
    }

    setToPolar(angle, speed) {
        this.x = Math.cos(angle) * speed;
        this.y = Math.sin(angle) * speed;
        return this;
    }
}

export class AnimationManager {
    constructor() {
        this.currentAnim = null;
        this.isPlaying = false;
        this.frameRate = 0;
        this.repeat = 0;
        this.frames = [];
    }

    play(key, ignoreIfPlaying = false) {
        if (ignoreIfPlaying && this.isPlaying && this.currentAnim?.key === key) {
            return;
        }
        this.currentAnim = { key };
        this.isPlaying = true;
        return this;
    }

    chain(key) {
        this.nextAnim = key;
        return this;
    }

    stop() {
        this.isPlaying = false;
        this.currentAnim = null;
        return this;
    }
}

export class Camera {
    constructor() {
        this.startFollow = jest.fn();
        this.setZoom = jest.fn();
        this.setBounds = jest.fn();
    }
}

export class CameraManager {
    constructor() {
        this.main = new Camera();
    }
}

// Mock game objects
export class GameObject {
    constructor(scene, x = 0, y = 0, texture = '') {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.texture = texture;
        this.active = true;
        this._data = new Map();
        this.alpha = 1;
        this.rotation = 0;
        this.scale = { x: 1, y: 1 };
        this.visible = true;
        this.depth = 0;
        this.tint = 0xffffff;
        this.originX = 0.5;
        this.originY = 0.5;

        this.body = {
            velocity: new Velocity(),
            setVelocity: (x, y) => {
                this.body.velocity.x = x;
                this.body.velocity.y = y;
                // Update position based on velocity
                this.x += this.body.velocity.x * 0.016;
                this.y += this.body.velocity.y * 0.016;
            },
            setVelocityX: (x) => {
                this.body.velocity.x = x;
                // Update position based on velocity
                this.x += this.body.velocity.x * 0.016;
            },
            setVelocityY: (y) => {
                this.body.velocity.y = y;
                // Update position based on velocity
                this.y += this.body.velocity.y * 0.016;
            },
            setSize: jest.fn(),
            setOffset: jest.fn(),
            setCollideWorldBounds: jest.fn(),
            setBounce: jest.fn(),
            setImmovable: jest.fn(),
            setCircle: jest.fn(),
            setAllowGravity: jest.fn(),
            setGravityY: jest.fn(),
            setMaxVelocity: jest.fn(),
            setDrag: jest.fn(),
            setAngularVelocity: jest.fn(),
            setAngularDrag: jest.fn(),
            setFriction: jest.fn(),
            setMass: jest.fn(),
            setAcceleration: jest.fn(),
            reset: jest.fn(),
            enable: jest.fn(),
            disable: jest.fn(),
            checkCollision: {
                none: false,
                up: true,
                down: true,
                left: true,
                right: true
            }
        };

        this.events = {
            emit: jest.fn()
        };
    }

    setData(key, value) {
        this._data.set(key, value);
        return this;
    }

    getData(key) {
        return this._data.get(key);
    }

    destroy() {
        this.active = false;
    }

    setActive(value) {
        this.active = value;
        return this;
    }

    setVisible(value) {
        this.visible = value;
        return this;
    }

    setAlpha(value) {
        this.alpha = value;
        return this;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    setScale(x, y) {
        this.scale.x = x;
        this.scale.y = y || x;
        return this;
    }

    setRotation(value) {
        this.rotation = value;
        return this;
    }

    setDepth(value) {
        this.depth = value;
        return this;
    }

    setTint(value) {
        this.tint = value;
        return this;
    }

    setOrigin(x, y) {
        this.originX = x;
        this.originY = y !== undefined ? y : x;
        return this;
    }

    // Add physics-related methods
    enableBody() {
        return this;
    }

    setCollideWorldBounds(value) {
        return this;
    }

    setBounce(value) {
        return this;
    }

    setDrag(x, y) {
        return this;
    }

    setAngularDrag(value) {
        return this;
    }

    setFriction(x, y) {
        return this;
    }

    setGravity(x, y) {
        return this;
    }

    setImmovable(value) {
        return this;
    }

    setMass(value) {
        return this;
    }
}

export class Group {
    constructor() {
        this.children = {
            entries: [],
            iterate: (callback) => {
                this.children.entries.forEach(callback);
            }
        };
    }

    create(x, y, key) {
        const obj = new GameObject();
        obj.x = x;
        obj.y = y;
        obj.key = key;
        this.children.entries.push(obj);
        return obj;
    }

    add(obj) {
        if (obj) {
            obj.active = true;
            obj.visible = true;
            this.children.entries.push(obj);
        }
        return obj;
    }

    remove(obj) {
        const index = this.children.entries.indexOf(obj);
        if (index > -1) {
            this.children.entries.splice(index, 1);
            obj.active = false;
            obj.visible = false;
        }
        return obj;
    }

    clear(removeFromScene, destroyChild) {
        this.children.entries = [];
    }
}

export class Graphics extends GameObject {
    constructor() {
        super();
        this.commands = [];
    }

    clear() {
        this.commands = [];
        return this;
    }

    lineStyle() {
        return this;
    }

    strokeRect() {
        return this;
    }

    fillStyle() {
        return this;
    }

    fillRect() {
        return this;
    }
}

// Mock physics
global.Physics = {
    add: {
        group: (config) => new Group(),
        existing: (obj) => {
            if (!obj.body) {
                obj.body = {
                    velocity: new Velocity(),
                    setVelocity: (x, y) => {
                        obj.body.velocity.x = x;
                        obj.body.velocity.y = y;
                        // Update position based on velocity
                        obj.x += obj.body.velocity.x * 0.016;
                        obj.y += obj.body.velocity.y * 0.016;
                    },
                    setVelocityX: (x) => {
                        obj.body.velocity.x = x;
                        // Update position based on velocity
                        obj.x += obj.body.velocity.x * 0.016;
                    },
                    setVelocityY: (y) => {
                        obj.body.velocity.y = y;
                        // Update position based on velocity
                        obj.y += obj.body.velocity.y * 0.016;
                    },
                    setSize: () => {},
                    offset: { set: () => {} },
                    collideWorldBounds: false
                };
            }
            return obj;
        }
    }
};

export class Scene extends Phaser.Scene {
    constructor() {
        super();
        this.add = {
            sprite: jest.fn().mockReturnValue(new GameObject(this)),
            graphics: jest.fn().mockReturnValue({
                fillStyle: jest.fn().mockReturnThis(),
                fillRect: jest.fn().mockReturnThis(),
                clear: jest.fn().mockReturnThis(),
                destroy: jest.fn().mockReturnThis(),
                lineStyle: jest.fn().mockReturnThis(),
                beginPath: jest.fn().mockReturnThis(),
                moveTo: jest.fn().mockReturnThis(),
                lineTo: jest.fn().mockReturnThis(),
                closePath: jest.fn().mockReturnThis(),
                fill: jest.fn().mockReturnThis(),
                stroke: jest.fn().mockReturnThis(),
                arc: jest.fn().mockReturnThis()
            }),
            group: jest.fn().mockReturnValue({
                add: jest.fn(),
                remove: jest.fn(),
                children: { 
                    iterate: jest.fn(),
                    entries: []
                }
            }),
            text: jest.fn().mockReturnValue({
                setOrigin: jest.fn().mockReturnThis(),
                destroy: jest.fn()
            }),
            circle: jest.fn().mockReturnValue(new GameObject(this)),
            rectangle: jest.fn().mockReturnValue(new GameObject(this))
        };
        
        this.load = {
            on: jest.fn(),
            spritesheet: jest.fn(),
            image: jest.fn(),
            audio: jest.fn()
        };
        
        this.anims = {
            create: jest.fn(),
            generateFrameNumbers: jest.fn()
        };
        
        this.physics = {
            add: {
                sprite: jest.fn().mockReturnValue(new GameObject(this)),
                group: jest.fn().mockReturnValue({
                    add: jest.fn(),
                    remove: jest.fn(),
                    children: { 
                        iterate: jest.fn(),
                        entries: []
                    }
                }),
                existing: jest.fn().mockReturnValue(new GameObject(this))
            },
            world: {
                setBounds: jest.fn(),
                enable: jest.fn()
            }
        };
        
        this.cameras = {
            main: {
                width: 800,
                height: 600,
                setBounds: jest.fn(),
                startFollow: jest.fn(),
                setZoom: jest.fn()
            }
        };
        
        this.input = {
            keyboard: {
                addKey: jest.fn().mockReturnValue({
                    isDown: false
                }),
                createCursorKeys: jest.fn().mockReturnValue({
                    up: { isDown: false },
                    down: { isDown: false },
                    left: { isDown: false },
                    right: { isDown: false }
                })
            }
        };
        
        this.time = {
            now: Date.now(),
            addEvent: jest.fn().mockReturnValue({
                remove: jest.fn()
            })
        };
        
        this.events = {
            on: jest.fn(),
            once: jest.fn(),
            emit: jest.fn()
        };
        
        this.scene = {
            start: jest.fn(),
            pause: jest.fn(),
            resume: jest.fn(),
            stop: jest.fn(),
            restart: jest.fn(),
            launch: jest.fn(),
            key: '',
            manager: {
                scenes: []
            }
        };
        
        this.sys = {
            settings: {
                physics: {
                    arcade: {
                        gravity: { y: 0 }
                    }
                }
            }
        };
    }
}

// Export mock classes for use in tests
module.exports = {
    GameObject,
    Group,
    Graphics,
    AnimationManager,
    Velocity,
    Camera,
    CameraManager
};

// Define window functions if they don't exist (for jsdom)
if (typeof window === 'undefined') {
    global.window = {};
}

// Define requestAnimationFrame and cancelAnimationFrame on window
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback) {
        return setTimeout(() => callback(performance.now()), 1000 / 60);
    };
}

if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}

// Ensure these are also available globally
global.requestAnimationFrame = window.requestAnimationFrame;
global.cancelAnimationFrame = window.cancelAnimationFrame;

// Setup performance.now if not available
if (!global.performance) {
    global.performance = {};
}
if (!global.performance.now) {
    global.performance.now = jest.fn(() => Date.now());
}