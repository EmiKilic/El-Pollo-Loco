/**
 * Represents a game level, containing all the elements such as enemies, clouds, background objects, bottles, coins, and the end boss.
 * Each level is defined by its specific elements and the point at which the level ends.
 */
class Level {
    /** @type {MovableObject[]} Array of enemies present in the level. */
    enemies;
  
    /** @type {MovableObject[]} Array of clouds present in the level. */
    clouds;
  
    /** @type {MovableObject[]} Array of background objects in the level. */
    backgroundObjects;
  
    /** @type {MovableObject[]} Array of bottles (collectible items) in the level. */
    bottle;
  
    /** @type {MovableObject[]} Array of coins (collectible items) in the level. */
    coin;
  
    /** @type {MovableObject} The end boss present in the level. */
    endboss;
  
    /** @type {number} The x-coordinate where the level ends (default is 700). */
    level_end_x = 700;
  
    /**
     * Creates a new Level instance with the specified enemies, clouds, background objects, bottles, coins, and end boss.
     * 
     * @param {MovableObject[]} enemies - Array of enemies in the level.
     * @param {MovableObject[]} clouds - Array of clouds in the level.
     * @param {MovableObject[]} backgroundObjects - Array of background objects in the level.
     * @param {MovableObject[]} bottle - Array of bottles (collectibles) in the level.
     * @param {MovableObject[]} coin - Array of coins (collectibles) in the level.
     * @param {MovableObject} endboss - The end boss in the level.
     */
    constructor(enemies, clouds, backgroundObjects, bottle, coin, endboss) {
      this.enemies = enemies;
      this.clouds = clouds;
      this.backgroundObjects = backgroundObjects;
      this.bottle = bottle;
      this.coin = coin;
      this.endboss = endboss;
    }
  }
  