import { WeaponTypes, WeaponBehaviors, WeaponConfigs, StatusEffects } from '../constants/weapons.js';
import { WeaponSystem } from '../systems/WeaponSystem.js';
import { EnemySystem } from '../systems/EnemySystem.js';
import { StatusEffectSystem } from '../systems/StatusEffectSystem.js';
import { WorldSystem } from '../systems/WorldSystem.js';
import { PlayerController } from '../components/player/PlayerController.js';
import { UIManager } from '../components/ui/UIManager.js';

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.player = null;
        this.enemies = null;
        this.weapons = null;
        this.experience = 0;
        this.level = 1;
        this.score = 0;
        this.gameTime = 0;
        this.nextEnemySpawn = 0;
        this.nextWeaponSpawn = 0;
        this.worldSize = {
            width: 1600,
            height: 1200
        };
        this.orbitingWeapons = [];
        this.areaEffects = [];
        this.statusEffects = new Map();
    }

    create() {
        // Initialize systems
        this.worldSystem = new WorldSystem(this);
        this.weaponSystem = new WeaponSystem(this);
        this.enemySystem = new EnemySystem(this);
        this.statusEffectSystem = new StatusEffectSystem(this);
        this.playerController = new PlayerController(this);
        this.uiManager = new UIManager(this);

        console.log('Initializing game systems...');

        // Create world and game objects
        this.worldSystem.createWorld();
        this.player = this.playerController.createPlayer();
        console.log('Player created:', this.player);
        
        this.enemies = this.enemySystem.createEnemyGroup();
        console.log('Enemy group created:', this.enemies);

        this.weapons = this.weaponSystem.createWeaponGroup();

        // Setup UI
        this.uiManager.createUI();

        // Setup camera
        this.setupCamera();

        // Setup collisions
        this.setupCollisions();

        // Initialize weapons
        this.weaponSystem.initializeWeapons(this.player);

        // Start enemy spawning
        this.time.addEvent({
            delay: 2000,  // Spawn every 2 seconds
            callback: () => {
                console.log('Attempting to spawn enemy...');
                this.enemySystem.spawnEnemy();
            },
            callbackScope: this,
            loop: true
        });

        // Start game timer
        this.time.addEvent({
            delay: 1000,
            callback: this.updateGameTime,
            callbackScope: this,
            loop: true
        });
    }

    update(time, delta) {
        if (!this.player.active) return;

        // Update all systems
        this.playerController.handleMovement();
        this.enemySystem.update(time, this.player);
        this.weaponSystem.handleWeaponBehavior(time, this.player);
        this.statusEffectSystem.update(time);

        // Update UI
        this.updateUI();
    }

    setupCamera() {
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(1.0);
        this.cameras.main.setBounds(
            0, 0,
            this.worldSystem.getWorldSize().width,
            this.worldSystem.getWorldSize().height
        );
    }

    setupCollisions() {
        this.physics.add.overlap(
            this.weapons,
            this.enemies,
            this.handleWeaponEnemyCollision,
            null,
            this
        );

        this.physics.add.overlap(
            this.player,
            this.enemies,
            this.handlePlayerEnemyCollision,
            null,
            this
        );
    }

    handleWeaponEnemyCollision(weapon, enemy) {
        this.weaponSystem.handleWeaponEnemyCollision(weapon, enemy);

        if (enemy.getData('health') <= 0) {
            this.enemySystem.killEnemy(enemy);
            this.score += 10;
        }
    }

    handlePlayerEnemyCollision(player, enemy) {
        if (!enemy.getData('isPhasing')) {
            this.playerController.takeDamage(enemy.getData('attackDamage') || 10);
            this.createHitEffect(player.x, player.y);
        }
    }

    createHitEffect(x, y) {
        const effect = this.add.circle(x, y, 20, 0xff0000, 0.5);
        
        this.tweens.add({
            targets: effect,
            scale: 2,
            alpha: 0,
            duration: 200,
            onComplete: () => effect.destroy()
        });
    }

    updateGameTime() {
        this.gameTime++;
    }

    updateUI() {
        this.uiManager.updateHealthBar();
        this.uiManager.updateExpBar();
        this.uiManager.updateScoreAndLevel();
        this.uiManager.updateTimeDisplay();
    }

    showLevelUpEffect() {
        this.uiManager.showLevelUpEffect();
    }

    addExperience(amount) {
        this.playerController.addExperience(amount);
    }

    gameOver() {
        this.cleanup();
        this.scene.start('GameOverScene', {
            score: this.score,
            gameTime: this.gameTime,
            level: this.player.getData('level')
        });
    }

    cleanup() {
        this.weaponSystem.cleanup();
        this.enemySystem.cleanup();
        this.statusEffectSystem.cleanup();
        this.playerController.cleanup();
        this.uiManager.cleanup();
        this.worldSystem.cleanup();
    }
} 