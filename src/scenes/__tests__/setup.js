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
                this.x += this.body.velocity.x * 0.016;
                this.y += this.body.velocity.y * 0.016;
            },
            setVelocityX: (x) => {
                this.body.velocity.x = x;
                this.x += this.body.velocity.x * 0.016;
            },
            setVelocityY: (y) => {
                this.body.velocity.y = y;
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
} 