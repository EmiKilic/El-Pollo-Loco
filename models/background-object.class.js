/**
 * Represents a background object in the game that is displayed in the background layer.
 * Extends the {@link MovableObject} class, which gives it the ability to move or be positioned.
 * 
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
  /** @type {number} The width of the background object (default is 720). */
  width = 720;
  
  /** @type {number} The height of the background object (default is 480). */
  height = 480;

  /**
   * Creates a new BackgroundObject.
   * 
   * @param {string} imagePath - The path to the background image.
   * @param {number} x - The x-coordinate where the background object is positioned.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
