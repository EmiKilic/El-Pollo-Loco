/**
 * Represents a drawable object in the game, capable of loading and displaying images.
 * This class provides common methods for loading images, drawing objects onto a canvas, and handling image caching.
 * 
 * @class
 */
class DrawableObject {
  /** @type {HTMLImageElement} The image element representing the current object. */
  img;

  /** @type {Object<string, HTMLImageElement>} A cache for preloaded images, keyed by their file path. */
  imageCache = {};

  /** @type {number} The index of the current image being displayed from the image cache (default is 0). */
  currentImage = 0;

  /** @type {number} The x-coordinate of the object (default is 120). */
  x = 120;

  /** @type {number} The y-coordinate of the object (default is 250). */
  y = 250;

  /** @type {number} The height of the object (default is 150). */
  height = 150;

  /** @type {number} The width of the object (default is 100). */
  width = 100;

  /**
   * Loads a single image from the given path and assigns it to the object.
   * 
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads an array of images and stores them in the image cache.
   * 
   * @param {string[]} arr - An array of image paths to load.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;  // Cache the image using its file path as the key
    });
  }

  /**
   * Draws the current image of the object on the canvas.
   * 
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context for the canvas.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);  // Draw the image at the object's position
  }

  /**
   * Draws a red border around the object if it is an instance of a game entity that requires a frame.
   * This is useful for debugging purposes to visualize the object's boundaries.
   * 
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context for the canvas.
   */
  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Coin || this instanceof Bottle || this instanceof ThrowableObject) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "red";
      ctx.rect(this.x, this.y, this.width, this.height);  // Draw a rectangle around the object
      ctx.stroke();
    }
  }
}
