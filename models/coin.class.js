class Coin extends MovableObject {
    height = 50;
    width = 50;
    IMAGES_COIN_PNG = [
      "img/4. Marcadores/1. Coins/1.png",
      "img/4. Marcadores/1. Coins/2.png",
      "img/4. Marcadores/1. Coins/3.png",
      "img/4. Marcadores/1. Coins/4.png",
    ];

    currentImage = 0;
  
    constructor() {
      super().loadImage(this.IMAGES_COIN_PNG[0]);
      this.loadImages(this.IMAGES_COIN_PNG);
  
      this.x = 400 + Math.random() * 500 * 4;
      this.y = 0 + Math.random() * 300;
      this.animate();
    }
  
    animate() {
      setInterval(() => {
        this.playAnimation(this.IMAGES_COIN_PNG);
      }, 115);
    }
  }
  