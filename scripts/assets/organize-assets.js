import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ASSETS_ROOT = path.join(dirname(dirname(__dirname)), 'public/assets');

// Define the new structure
const DIRECTORIES = {
    sprites: {
        characters: ['player', 'enemies', 'npcs'],
        environment: ['tiles', 'props', 'effects'],
        ui: ['buttons', 'icons', 'panels']
    },
    audio: {
        music: [],
        sfx: []
    },
    maps: ['tilemaps', 'tilesets']
};

// File extensions to keep
const VALID_EXTENSIONS = {
    sprites: ['.png', '.jpg', '.gif'],
    audio: ['.wav', '.ogg', '.mp3'],
    maps: ['.json', '.tmx']
};

// Ensure directory exists
function ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

// Move files from source to target directory
function moveFiles(sourceDir, targetDir, validExtensions) {
    if (!fs.existsSync(sourceDir)) return;
    
    const items = fs.readdirSync(sourceDir);
    items.forEach(item => {
        const sourcePath = path.join(sourceDir, item);
        const stat = fs.statSync(sourcePath);
        
        if (stat.isDirectory()) {
            // Recursively process subdirectories
            moveFiles(sourcePath, targetDir, validExtensions);
        } else {
            const ext = path.extname(item).toLowerCase();
            if (validExtensions.includes(ext)) {
                const targetPath = path.join(targetDir, item);
                if (!fs.existsSync(targetPath)) {
                    fs.renameSync(sourcePath, targetPath);
                    console.log(`Moved: ${item} to ${targetDir}`);
                }
            }
        }
    });
}

// Clean up temporary files and empty directories
function cleanupTempFiles(dir) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            cleanupTempFiles(fullPath);
            // Remove empty directories and extracted asset directories
            if (fs.readdirSync(fullPath).length === 0 || 
                file === 'LPC Base Assets' || 
                file === 'Sprite Sheet Collection') {
                fs.rmdirSync(fullPath, { recursive: true });
                console.log(`Removed directory: ${file}`);
            }
        } else {
            // Remove temp files and empty files
            if (file.startsWith('temp') || file === '.DS_Store' || stat.size === 0) {
                fs.unlinkSync(fullPath);
                console.log(`Removed file: ${file}`);
            }
        }
    });
}

// Create directory structure
function createDirectoryStructure() {
    Object.entries(DIRECTORIES).forEach(([mainDir, subDirs]) => {
        const mainPath = path.join(ASSETS_ROOT, mainDir);
        ensureDirectoryExists(mainPath);

        if (Array.isArray(subDirs)) {
            subDirs.forEach(subDir => {
                const subPath = path.join(mainPath, subDir);
                ensureDirectoryExists(subPath);
            });
        } else {
            Object.entries(subDirs).forEach(([subDir, categories]) => {
                const subPath = path.join(mainPath, subDir);
                ensureDirectoryExists(subPath);
                
                categories.forEach(category => {
                    const categoryPath = path.join(subPath, category);
                    ensureDirectoryExists(categoryPath);
                });
            });
        }
    });
}

// Organize files into the new structure
function organizeFiles() {
    // Handle sprites
    const spritesDir = path.join(ASSETS_ROOT, 'sprites');
    if (fs.existsSync(spritesDir)) {
        // Process character sprites
        const charactersDir = path.join(spritesDir, 'characters');
        if (fs.existsSync(charactersDir)) {
            // Move files from LPC Base Assets
            const lpcDir = path.join(charactersDir, 'LPC Base Assets');
            if (fs.existsSync(lpcDir)) {
                moveFiles(lpcDir, path.join(charactersDir, 'player'), VALID_EXTENSIONS.sprites);
            }
            
            // Move files from Sprite Sheet Collection
            const spriteCollectionDir = path.join(charactersDir, 'Sprite Sheet Collection');
            if (fs.existsSync(spriteCollectionDir)) {
                moveFiles(spriteCollectionDir, path.join(charactersDir, 'enemies'), VALID_EXTENSIONS.sprites);
            }
            
            // Process remaining files
            const files = fs.readdirSync(charactersDir)
                .filter(file => VALID_EXTENSIONS.sprites.includes(path.extname(file).toLowerCase()));
            
            files.forEach(file => {
                const oldPath = path.join(charactersDir, file);
                const targetDir = file.includes('zombie') || file.includes('skeleton') ? 'enemies' : 'player';
                const newDir = path.join(charactersDir, targetDir);
                const newPath = path.join(newDir, file);
                
                ensureDirectoryExists(newDir);
                if (fs.existsSync(oldPath) && !fs.existsSync(newPath)) {
                    fs.renameSync(oldPath, newPath);
                    console.log(`Moved: ${file} to ${targetDir}`);
                }
            });
        }

        // Process environment sprites
        const envDir = path.join(spritesDir, 'environment');
        if (fs.existsSync(envDir)) {
            // Move files from LPC Base Assets
            const lpcDir = path.join(envDir, 'LPC Base Assets');
            if (fs.existsSync(lpcDir)) {
                moveFiles(lpcDir, path.join(envDir, 'tiles'), VALID_EXTENSIONS.sprites);
            }
            
            // Process remaining files
            const files = fs.readdirSync(envDir)
                .filter(file => VALID_EXTENSIONS.sprites.includes(path.extname(file).toLowerCase()));
            
            files.forEach(file => {
                const oldPath = path.join(envDir, file);
                const targetDir = file.includes('tileset') ? 'tiles' : 'props';
                const newDir = path.join(envDir, targetDir);
                const newPath = path.join(newDir, file);
                
                ensureDirectoryExists(newDir);
                if (fs.existsSync(oldPath) && !fs.existsSync(newPath)) {
                    fs.renameSync(oldPath, newPath);
                    console.log(`Moved: ${file} to ${targetDir}`);
                }
            });
        }
    }

    // Handle audio files
    const audioDir = path.join(ASSETS_ROOT, 'audio');
    if (fs.existsSync(audioDir)) {
        ['music', 'sfx'].forEach(type => {
            const typeDir = path.join(audioDir, type);
            if (fs.existsSync(typeDir)) {
                const audioFiles = fs.readdirSync(typeDir)
                    .filter(file => VALID_EXTENSIONS.audio.includes(path.extname(file).toLowerCase()));
                
                audioFiles.forEach(file => {
                    const oldPath = path.join(typeDir, file);
                    if (fs.existsSync(oldPath)) {
                        console.log(`Keeping audio file: ${file}`);
                    }
                });
            }
        });
    }
}

// Main function
async function main() {
    try {
        console.log('Creating directory structure...');
        createDirectoryStructure();

        console.log('\nOrganizing files...');
        organizeFiles();

        console.log('\nCleaning up temporary files and directories...');
        cleanupTempFiles(ASSETS_ROOT);

        console.log('\nAsset organization complete!');
        console.log('\nNew structure:');
        console.log('public/assets/');
        console.log('├── sprites/');
        console.log('│   ├── characters/');
        console.log('│   │   ├── player/');
        console.log('│   │   ├── enemies/');
        console.log('│   │   └── npcs/');
        console.log('│   ├── environment/');
        console.log('│   │   ├── tiles/');
        console.log('│   │   ├── props/');
        console.log('│   │   └── effects/');
        console.log('│   └── ui/');
        console.log('│       ├── buttons/');
        console.log('│       ├── icons/');
        console.log('│       └── panels/');
        console.log('├── audio/');
        console.log('│   ├── music/');
        console.log('│   └── sfx/');
        console.log('└── maps/');
        console.log('    ├── tilemaps/');
        console.log('    └── tilesets/');

    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

// Run the script
main(); 