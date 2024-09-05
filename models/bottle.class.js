/**
 * Represents a collectible bottle object in the game.
 * Extends the {@link MovableObject} class, inheriting movement-related functionality.
 * The bottle rotates and moves randomly in the game world.
 * 
 * @extends MovableObject
 */
class Bottle extends MovableObject {
  /** @type {number} The height of the bottle (default is 100). */
  height = 100;
  
  /** @type {number} The width of the bottle (default is 30). */
  width = 30;

  /** 
   * @type {string[]} The array of image paths used for bottle animations.
   */
  IMAGES_BOTTLE_PNG = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
  ];

  /** @type {number} The index of the current image being displayed. */
  currentImage = 0;

  /**
   * Creates a new Bottle object, loading its images and positioning it randomly on the x and y axes.
   * It also starts the animation for bottle rotation.
   */
  constructor() {
    super().loadImage(this.IMAGES_BOTTLE_PNG[0]);  // Load the initial bottle image
    this.loadImages(this.IMAGES_BOTTLE_PNG);       // Load all images for the bottle rotation

    // Randomize the bottle's position on the x and y axes
    this.x = 200 + Math.random() * 500 * 4;
    this.y = 150 + Math.random() * 200;
    
    // Start the bottle animation
    this.animate();
  }

  /**
   * Animates the bottle by periodically cycling through the images.
   * Uses `setInterval` to create the rotation animation every 150ms.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE_PNG);  // Play the animation by cycling through the images
    }, 150);
  }
}
