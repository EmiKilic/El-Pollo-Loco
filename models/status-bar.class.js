/**
 * Represents the status bar in the game, displaying the player's health, coin count, and bottle count.
 * Extends the {@link DrawableObject} class to allow drawing these status bars onto the canvas.
 * The status bar uses different images to reflect changes in the player's health, coins, and bottles.
 * 
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
  /** @type {string[]} Array of image paths for the health status bar. */
  IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  /** @type {string[]} Array of image paths for the coin status bar. */
  IMAGES_COIN = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  /** @type {string[]} Array of image paths for the bottle status bar. */
  IMAGES_BOTTLE = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  /** @type {number} The current percentage of health (default is 100). */
  percentage = 100;

  /** @type {number} The current amount of coins collected by the player (default is 0). */
  money = 0;

  /** @type {number} The current amount of bottles collected by the player (default is 0). */
  bottle = 0;

  /**
   * Creates a new StatusBar instance, loading the images for health, coins, and bottles, and setting their initial values.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.loadImages(this.IMAGES_COIN);
    this.loadImages(this.IMAGES_BOTTLE);
    this.setPercentage(100);
    this.showCoin(0);
    this.showBottle(this.bottle);
  }

  /**
   * Updates the bottle status bar to reflect the given value.
   * 
   * @param {number} value - The number of bottles collected.
   */
  showBottle(value) {
    this.bottle = value;
    let path = this.IMAGES_BOTTLE[this.resolveImageIndexBottle()];
    this.imgBottle = this.imageCache[path];
  }

  /**
   * Resolves the index of the image to be used for the bottle status bar based on the number of bottles collected.
   * 
   * @returns {number} The index of the image in the bottle image array.
   */
  resolveImageIndexBottle() {
    if (this.bottle == 0) {
      return 0;
    } else if (this.bottle == 1) {
      return 1;
    } else if (this.bottle == 2) {
      return 2;
    } else if (this.bottle == 3) {
      return 3;
    } else if (this.bottle == 4) {
      return 4;
    } else {
      return 5;
    }
  }

  /**
   * Updates the coin status bar to reflect the given value.
   * 
   * @param {number} value - The number of coins collected.
   */
  showCoin(value) {
    this.money = value;
    let path = this.IMAGES_COIN[this.resolveImageIndexCoin()];
    this.imgCoin = this.imageCache[path];
  }

  /**
   * Resolves the index of the image to be used for the coin status bar based on the number of coins collected.
   * 
   * @returns {number} The index of the image in the coin image array.
   */
  resolveImageIndexCoin() {
    if (this.money == 0) {
      return 0;
    } else if (this.money == 1) {
      return 1;
    } else if (this.money == 2) {
      return 2;
    } else if (this.money == 3) {
      return 3;
    } else if (this.money == 4) {
      return 4;
    } else {
      return 5;
    }
  }

  /**
   * Updates the health status bar to reflect the given percentage of health remaining.
   * 
   * @param {number} value - The percentage of health remaining.
   */
  setPercentage(value) {
    this.percentage = value;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.imgLife = this.imageCache[path];
  }

  /**
   * Resolves the index of the image to be used for the health status bar based on the percentage of health remaining.
   * 
   * @returns {number} The index of the image in the health image array.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }

  /**
   * Draws the status bars (for health, coins, and bottles) onto the canvas.
   * 
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context for the canvas.
   */
  draw(ctx) {
    // Drawing the bottle status bar
    ctx.drawImage(this.imgBottle, 30, 0, 200, 60);

    // Drawing the health status bar
    ctx.drawImage(this.imgLife, 30, 40, 200, 60);

    // Drawing the coin status bar
    ctx.drawImage(this.imgCoin, 30, 80, 200, 60);
  }
}
