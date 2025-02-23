/**
 * Game event constants
 */

export const GAME_EVENTS = {
  // Game state events
  GAME_START: 'game:start',
  GAME_PAUSE: 'game:pause',
  GAME_RESUME: 'game:resume',
  GAME_OVER: 'game:over',
  GAME_WIN: 'game:win',
  GAME_RESET: 'game:reset',

  // Player events
  PLAYER_SPAWN: 'player:spawn',
  PLAYER_DEATH: 'player:death',
  PLAYER_DAMAGE: 'player:damage',
  PLAYER_HEAL: 'player:heal',
  PLAYER_LEVEL_UP: 'player:levelUp',
  PLAYER_EXPERIENCE_GAIN: 'player:experienceGain',
  PLAYER_WEAPON_CHANGE: 'player:weaponChange',

  // Enemy events
  ENEMY_SPAWN: 'enemy:spawn',
  ENEMY_DEATH: 'enemy:death',
  ENEMY_DAMAGE: 'enemy:damage',
  ENEMY_STATUS_EFFECT: 'enemy:statusEffect',

  // Weapon events
  WEAPON_FIRE: 'weapon:fire',
  WEAPON_HIT: 'weapon:hit',
  WEAPON_PICKUP: 'weapon:pickup',
  WEAPON_UPGRADE: 'weapon:upgrade',

  // UI events
  UI_SHOW_MESSAGE: 'ui:showMessage',
  UI_HIDE_MESSAGE: 'ui:hideMessage',
  UI_UPDATE_SCORE: 'ui:updateScore',
  UI_SHOW_MENU: 'ui:showMenu',
  UI_HIDE_MENU: 'ui:hideMenu',

  // Audio events
  AUDIO_PLAY_MUSIC: 'audio:playMusic',
  AUDIO_STOP_MUSIC: 'audio:stopMusic',
  AUDIO_PLAY_SFX: 'audio:playSfx',
  AUDIO_VOLUME_CHANGE: 'audio:volumeChange',

  // System events
  SYSTEM_ERROR: 'system:error',
  SYSTEM_WARNING: 'system:warning',
  SYSTEM_CONFIG_CHANGE: 'system:configChange',
  SYSTEM_SAVE_STATE: 'system:saveState',
  SYSTEM_LOAD_STATE: 'system:loadState'
}; 