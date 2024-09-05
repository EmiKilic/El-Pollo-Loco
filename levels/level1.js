/**
 * Initializes level 1 of the game by creating various objects such as enemies, background elements,
 * items (bottles and coins), and the end boss.
 */
let level1;

function initLevel() {
  level1 = new Level(
    // Array of enemies (Chickens)
    [new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken()],

    // Array of clouds
    [new Cloud(), new Cloud()],

    // Array of background objects
    [
      new BackgroundObject("img/5_background/layers/air.png", -719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -719),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),
      
      new BackgroundObject("img/5_background/layers/air.png", 0),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
      
      new BackgroundObject("img/5_background/layers/air.png", 719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),
      
      new BackgroundObject("img/5_background/layers/air.png", 719 * 2),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 2),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 2),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 2),
      
      new BackgroundObject("img/5_background/layers/air.png", 719 * 3),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719 * 3),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719 * 3),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719 * 3),
      
      new BackgroundObject("img/5_background/layers/air.png", 719 * 4),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 4),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 4),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 4)
    ],

    // Array of bottles (collectible items)
    [new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle()],

    // Array of coins (collectible items)
    [new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin()],

    // Array with the end boss
    [new Endboss()]
  );
}
