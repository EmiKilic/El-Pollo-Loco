/**
 * Represents a cloud object in the game's background.
 * Extends the {@link MovableObject} class, inheriting movement-related functionality such as moving to the left.
 * The cloud floats at a fixed height and moves across the screen.
 * 
 * @extends MovableObject
 */
class Cloud extends MovableObject {
  /** @type {number} The y-coordinate of the cloud (default is 20). */
  y = 20;

  /** @type {number} The height of the cloud (default is 250). */
  height = 250;

  /**
   * Creates a new Cloud instance, setting its initial position randomly on the x-axis.
   * Loads the cloud image and starts the movement animation.
   */
  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = 0 + Math.random() * 500;
    this.width = 500;
    this.animate();
  }

  /**
   * Moves the cloud to the left across the screen.
   * The cloud continuously moves to the left after creation.
   */
  animate() {
    this.moveLeft();
  }
}
