/**
 * Game utility functions
 */

import { StatusEffects } from '../constants/weapons';

/**
 * Get the tint color for a status effect
 * @param {string} effect - Status effect type
 * @returns {number} Hex color value for the effect
 */
export function getStatusEffectTint(effect) {
  switch (effect) {
    case StatusEffects.BURN:
      return 0xff4400;
    case StatusEffects.SLOW:
      return 0x4444ff;
    case StatusEffects.POISON:
      return 0x00ff00;
    case StatusEffects.STUN:
      return 0xffff00;
    case StatusEffects.FREEZE:
      return 0x00ffff;
    default:
      return 0xffffff;
  }
}

/**
 * Find the nearest game object from a source
 * @param {Phaser.GameObjects.GameObject} source - Source game object
 * @param {Array<Phaser.GameObjects.GameObject>} targets - Array of potential targets
 * @returns {Phaser.GameObjects.GameObject|null} Nearest target or null if none found
 */
export function findNearestGameObject(source, targets) {
  let nearest = null;
  let nearestDistance = Infinity;

  targets.forEach(target => {
    const distance = Phaser.Math.Distance.Between(
      source.x, source.y,
      target.x, target.y
    );
    if (distance < nearestDistance) {
      nearest = target;
      nearestDistance = distance;
    }
  });

  return nearest;
}

/**
 * Get asset path for loading
 * @param {string} category - Asset category (characters, environment, ui, audio, maps)
 * @param {string} type - Asset type
 * @param {string} name - Asset name
 * @returns {string} Full asset path
 */
export function getAssetPath(category, type, name) {
  return `/assets/${category}/${type}/${name}`;
} 