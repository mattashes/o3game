export class WorldSystem {
    constructor(scene) {
        this.scene = scene;
        this.worldSize = {
            width: 1600,
            height: 1200
        };
        this.tileSize = 64;
    }

    createWorld() {
        this.createBackground();
        this.createBoundaries();
        this.createDecorations();
    }

    createBackground() {
        // Create a repeating tile pattern for the ground
        const tilesX = Math.ceil(this.worldSize.width / this.tileSize);
        const tilesY = Math.ceil(this.worldSize.height / this.tileSize);

        for (let x = 0; x < tilesX; x++) {
            for (let y = 0; y < tilesY; y++) {
                const tileX = x * this.tileSize;
                const tileY = y * this.tileSize;
                
                // Alternate between different ground tiles for variety
                const tileIndex = (x + y) % 2 === 0 ? 'ground1' : 'ground2';
                
                const tile = this.scene.add.sprite(tileX, tileY, tileIndex)
                    .setOrigin(0, 0)
                    .setDepth(-1);

                // Add some random rotation and tint variation for natural look
                tile.setRotation(Math.random() * 0.1 - 0.05);
                tile.setTint(0xffffff - Math.random() * 0x222222);
            }
        }
    }

    createBoundaries() {
        // Create invisible walls at the world boundaries
        const thickness = 32;

        // Top boundary
        this.scene.add.rectangle(0, -thickness, this.worldSize.width, thickness)
            .setOrigin(0, 0)
            .setDepth(-1);

        // Bottom boundary
        this.scene.add.rectangle(0, this.worldSize.height, this.worldSize.width, thickness)
            .setOrigin(0, 0)
            .setDepth(-1);

        // Left boundary
        this.scene.add.rectangle(-thickness, 0, thickness, this.worldSize.height)
            .setOrigin(0, 0)
            .setDepth(-1);

        // Right boundary
        this.scene.add.rectangle(this.worldSize.width, 0, thickness, this.worldSize.height)
            .setOrigin(0, 0)
            .setDepth(-1);
    }

    createDecorations() {
        // Add random decorative elements throughout the world
        const numDecorations = 50;
        const decorationTypes = ['tree', 'rock', 'bush', 'flower'];
        const safeRadius = 200; // Keep area around spawn point clear

        for (let i = 0; i < numDecorations; i++) {
            const type = decorationTypes[Math.floor(Math.random() * decorationTypes.length)];
            let x, y;
            let attempts = 0;
            const maxAttempts = 10;

            // Try to find a valid position that's not too close to spawn
            do {
                x = Math.random() * (this.worldSize.width - 100) + 50;
                y = Math.random() * (this.worldSize.height - 100) + 50;
                attempts++;
            } while (
                this.isNearSpawnPoint(x, y, safeRadius) &&
                attempts < maxAttempts
            );

            if (attempts < maxAttempts) {
                const decoration = this.scene.add.sprite(x, y, type)
                    .setDepth(y) // Use y position for depth sorting
                    .setScale(0.8 + Math.random() * 0.4); // Random size variation

                // Add some random rotation for natural look
                if (type !== 'tree') { // Don't rotate trees
                    decoration.setRotation(Math.random() * Math.PI * 2);
                }

                // Add subtle animation for plants
                if (type === 'bush' || type === 'flower') {
                    this.scene.tweens.add({
                        targets: decoration,
                        scaleX: decoration.scaleX * 1.1,
                        scaleY: decoration.scaleY * 1.1,
                        duration: 2000 + Math.random() * 1000,
                        yoyo: true,
                        repeat: -1,
                        ease: 'Sine.easeInOut'
                    });
                }
            }
        }
    }

    isNearSpawnPoint(x, y, radius) {
        const spawnX = this.worldSize.width / 2;
        const spawnY = this.worldSize.height / 2;
        const distance = Math.sqrt(
            Math.pow(x - spawnX, 2) + Math.pow(y - spawnY, 2)
        );
        return distance < radius;
    }

    isWithinWorldBounds(x, y) {
        return x >= 0 && x <= this.worldSize.width &&
               y >= 0 && y <= this.worldSize.height;
    }

    getWorldSize() {
        return this.worldSize;
    }

    cleanup() {
        // Nothing to clean up since all sprites are managed by the scene
    }
} 