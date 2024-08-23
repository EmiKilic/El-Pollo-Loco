class StatusBar extends DrawableObject {
  IMAGES = [
    "img/4. Marcadores/green/Life/0_  copia 3.png",
    "img/4. Marcadores/green/Life/20_ copia 4.png",
    "img/4. Marcadores/green/Life/40_  copia 3.png",
    "img/4. Marcadores/green/Life/60_  copia 3.png",
    "img/4. Marcadores/green/Life/80_  copia 3.png",
    "img/4. Marcadores/green/Life/100_  copia 2.png",
  ];
  IMAGES_COIN = [
    "img/4. Marcadores/green/Coin/0_  copia 4.png",
    "img/4. Marcadores/green/Coin/20_  copia 2.png",
    "img/4. Marcadores/green/Coin/40_  copia 4.png",
    "img/4. Marcadores/green/Coin/60_  copia 4.png",
    "img/4. Marcadores/green/Coin/80_  copia 4.png",
    "img/4. Marcadores/green/Coin/100_ copia 4.png",
  ];
  IMAGES_POSION = [
    "img/4. Marcadores/green/poisoned bubbles/0_ copia 2.png",
    "img/4. Marcadores/green/poisoned bubbles/20_ copia 3.png",
    "img/4. Marcadores/green/poisoned bubbles/40_ copia 2.png",
    "img/4. Marcadores/green/poisoned bubbles/60_ copia 2.png",
    "img/4. Marcadores/green/poisoned bubbles/80_ copia 2.png",
    "img/4. Marcadores/green/poisoned bubbles/100_ copia 3.png",
  ];

  percentage = 100;
  money = 0;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.loadImages(this.IMAGES_COIN);
    this.loadImages(this.IMAGES_POSION);
    this.setPercentage(100);
    this.showCoin(0);
    this.showPoison(0);
  }

  showPoison(value) {
    this.money = value;
    let path = this.IMAGES_POSION[this.resolveImageIndexPoison()];
    this.imgPoison = this.ImageCache[path];
  }

  resolveImageIndexPoison() {
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

  showCoin(value) {
    this.money = value;
    let path = this.IMAGES_COIN[this.resolveImageIndexCoin()];
    this.imgCoin = this.ImageCache[path];
  }

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

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.imgLife = this.ImageCache[path];
  }

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

  draw(ctx) {
    // Drawing the life bar
    ctx.drawImage(this.imgPoison, 30, 0, 200, 60);

    // Drawing the life bar
    ctx.drawImage(this.imgLife, 30, 40, 200, 60);

    // Drawing the coin indicator, positioned slightly to the right
    ctx.drawImage(this.imgCoin, 30, 80, 200, 60);
  }
}
