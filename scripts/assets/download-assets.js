import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const WEAPON_SOUNDS = [
    'dagger_throw.wav',
    'bow_shoot.wav',
    'magic_cast.wav',
    'axe_throw.wav',
    'holy_cast.wav',
    'garlic_pulse.wav',
    'whip_crack.wav',
    'bible_orbit.wav'
];

const SFX_DIR = 'public/assets/audio/sfx';

// Create a WAV file with a simple beep sound
function createBeepWav(outputPath) {
    const sampleRate = 44100;
    const duration = 0.1; // 100ms
    const frequency = 440; // 440 Hz (A4 note)
    const numSamples = Math.floor(sampleRate * duration);
    
    // Create audio data (16-bit PCM)
    const dataSize = numSamples * 2; // 2 bytes per sample
    const buffer = Buffer.alloc(44 + dataSize); // 44 bytes header + data
    
    // RIFF chunk descriptor
    buffer.write('RIFF', 0);
    buffer.writeUInt32LE(36 + dataSize, 4); // ChunkSize
    buffer.write('WAVE', 8);
    
    // fmt sub-chunk
    buffer.write('fmt ', 12);
    buffer.writeUInt32LE(16, 16); // Subchunk1Size
    buffer.writeUInt16LE(1, 20); // AudioFormat (1 = PCM)
    buffer.writeUInt16LE(1, 22); // NumChannels (1 = mono)
    buffer.writeUInt32LE(sampleRate, 24); // SampleRate
    buffer.writeUInt32LE(sampleRate * 2, 28); // ByteRate
    buffer.writeUInt16LE(2, 32); // BlockAlign
    buffer.writeUInt16LE(16, 34); // BitsPerSample
    
    // data sub-chunk
    buffer.write('data', 36);
    buffer.writeUInt32LE(dataSize, 40);
    
    // Write audio data
    for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        const sample = Math.sin(2 * Math.PI * frequency * t) * 0x7FFF;
        buffer.writeInt16LE(sample, 44 + i * 2);
    }
    
    fs.writeFileSync(outputPath, buffer);
    console.log(`Created beep WAV file: ${outputPath}`);
}

console.log('Starting to create beep WAV files...');

// Create directory if it doesn't exist
if (!fs.existsSync(SFX_DIR)) {
    console.log(`Creating directory: ${SFX_DIR}`);
    fs.mkdirSync(SFX_DIR, { recursive: true });
} else {
    console.log(`Directory already exists: ${SFX_DIR}`);
}

// Create beep WAV files
for (const filename of WEAPON_SOUNDS) {
    const outputPath = path.join(SFX_DIR, filename);
    try {
        createBeepWav(outputPath);
    } catch (error) {
        console.error(`Error creating ${filename}:`, error.message);
    }
}

console.log('\nBeep WAV files created successfully!');