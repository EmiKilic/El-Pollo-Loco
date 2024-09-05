/**
 * Represents a collectible coin in the game.
 * Extends the {@link MovableObject} class, inheriting movement-related functionality.
 * The coin has an animation that flips between two images and is placed randomly in the game world.
 * 
 * @extends MovableObject
 */
class Coin extends MovableObject {
  /** @type {number} The height of the coin (default is 50). */
  height = 50;

  /** @type {number} The width of the coin (default is 50). */
  width = 50;

  /** @type {string[]} Array of image paths for the coin's animation. */
  IMAGES_COIN_PNG = [
    "img/8_coin/coin_1.png",
    "img/8_coin/coin_2.png",
  ];

  /** @type {number} Index of the current image being displayed for the coin. */
  currentImage = 0;

  /**
   * Creates a new Coin instance, setting its position randomly on the x and y axes.
   * Loads the coin images for animation and starts the animation cycle.
   */
  constructor() {
    super().loadImage(this.IMAGES_COIN_PNG[0]);
    this.loadImages(this.IMAGES_COIN_PNG);
    this.x = 400 + Math.random() * 500 * 4;
    this.y = 150 + Math.random() * 200;
    this.animate();
  }

  /**
   * Animates the coin by switching between its images to create a spinning effect.
   * The animation changes images every 115 milliseconds.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COIN_PNG);
    }, 115);
  }
}
