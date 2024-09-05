/**
 * Represents a chicken enemy in the game.
 * Extends the {@link MovableObject} class, inheriting movement-related functionality such as walking and animation.
 * The chicken can walk left or right and can switch directions. It also has different states for walking and being dead.
 * 
 * @extends MovableObject
 */
class Chicken extends MovableObject {
  /** @type {number} The y-coordinate of the chicken (default is 350). */
  y = 350;

  /** @type {number} The height of the chicken (default is 80). */
  height = 80;

  /** @type {number} The width of the chicken (default is 80). */
  width = 80;

  /** @type {string[]} Array of image paths for the chicken's walking animation. */
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  /** @type {string[]} Array of image paths for the chicken's dead state. */
  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  /**
   * Creates a new Chicken instance, setting its initial position and speed randomly.
   * Loads the images for walking and dead states, and starts the chicken's animation.
   */
  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);  // Load the initial walking image
    this.loadImages(this.IMAGES_WALKING);       // Load all walking images
    this.loadImages(this.IMAGES_DEAD);          // Load the dead image

    // Randomize the chicken's position and speed
    this.x = 500 + Math.random() * 2000;
    this.speed = 0.15 + Math.random() * 0.25;
    
    // Start the chicken's animation
    this.animate();
  }

  /**
   * Animates the chicken's movement and appearance.
   * - The chicken changes direction every 5 seconds.
   * - The chicken moves left or right depending on the direction.
   * - The walking or dead animation is played depending on the chicken's state.
   */
  animate() {
    // Toggle the direction every 5 seconds
    setInterval(() => (this.otherDirection = !this.otherDirection), 5000);
    
    // Move the chicken depending on the direction and state
    setInterval(() => {
      if (!this.isDeadEndboss()) {
        this.otherDirection ? this.moveRight() : this.moveLeft();
      }
    }, 1000 / 60);

    // Play the appropriate animation (walking or dead) every 200ms
    setInterval(
      () => this.playAnimation(this.isDeadEndboss() ? this.IMAGES_DEAD : this.IMAGES_WALKING),
      200
    );
  }
}
