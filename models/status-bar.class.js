class StatusBar extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];
  IMAGES_COIN = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];
  IMAGES_BOTTLE = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  percentage = 100;
  money = 0;
  bottle = 0;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.loadImages(this.IMAGES_COIN);
    this.loadImages(this.IMAGES_BOTTLE);
    this.setPercentage(100);
    this.showCoin(0);
    this.showBottle(this.bottle);
  }

  showBottle(value) {
    this.bottle = value;
    let path = this.IMAGES_BOTTLE[this.resolveImageIndexBottle()];
    this.imgBottle = this.imageCache[path];
  }

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

  showCoin(value) {
    this.money = value;
    let path = this.IMAGES_COIN[this.resolveImageIndexCoin()];
    this.imgCoin = this.imageCache[path];
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

  setPercentage(value) {
    this.percentage = value;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.imgLife = this.imageCache[path];
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
    ctx.drawImage(this.imgBottle, 30, 0, 200, 60);

    // Drawing the life bar
    ctx.drawImage(this.imgLife, 30, 40, 200, 60);

    // Drawing the coin indicator, positioned slightly to the right
    ctx.drawImage(this.imgCoin, 30, 80, 200, 60);
  }
}
