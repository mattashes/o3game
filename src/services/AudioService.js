/**
 * Service for managing game audio
 */
export class AudioService {
  constructor(scene) {
    this.scene = scene;
    this._musicVolume = 0.5;
    this._sfxVolume = 0.7;
    this._currentMusic = null;
  }

  /**
   * Play a sound effect
   * @param {string} key - Sound effect key
   * @param {Object} [config] - Sound configuration
   */
  playSfx(key, config = {}) {
    this.scene.sound.play(key, {
      ...config,
      volume: this._sfxVolume
    });
  }

  /**
   * Play background music
   * @param {string} key - Music track key
   * @param {boolean} [loop=true] - Whether to loop the music
   */
  playMusic(key, loop = true) {
    if (this._currentMusic) {
      this._currentMusic.stop();
    }

    this._currentMusic = this.scene.sound.add(key, {
      volume: this._musicVolume,
      loop
    });
    this._currentMusic.play();
  }

  /**
   * Stop current background music
   */
  stopMusic() {
    if (this._currentMusic) {
      this._currentMusic.stop();
      this._currentMusic = null;
    }
  }

  /**
   * Set music volume
   * @param {number} volume - Volume level (0-1)
   */
  setMusicVolume(volume) {
    this._musicVolume = Math.max(0, Math.min(1, volume));
    if (this._currentMusic) {
      this._currentMusic.setVolume(this._musicVolume);
    }
  }

  /**
   * Set sound effects volume
   * @param {number} volume - Volume level (0-1)
   */
  setSfxVolume(volume) {
    this._sfxVolume = Math.max(0, Math.min(1, volume));
  }
} 