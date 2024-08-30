class Bottle extends MovableObject {
  height = 100;
  width = 30;

  IMAGES_BOTTLE_PNG = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
  ];
  currentImage = 0;

  constructor() {
    super().loadImage(this.IMAGES_BOTTLE_PNG[0]);
    this.loadImages(this.IMAGES_BOTTLE_PNG);

    this.x = 400 + Math.random() * 500 * 4;
    this.y = 0 + Math.random() * 300;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE_PNG);
    }, 150);
  }
}
