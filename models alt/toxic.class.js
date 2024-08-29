class Toxic extends MovableObject {
  height = 70;
  width = 50;

  IMAGES_TOXIC_PNG = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
  ];
  currentImage = 0;

  constructor() {
    super().loadImage(this.IMAGES_TOXIC_PNG[0]);
    this.loadImages(this.IMAGES_TOXIC_PNG);

    this.x = 400 + Math.random() * 500 * 4;
    this.y = 0 + Math.random() * 300;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_TOXIC_PNG);
    }, 150);
  }
}
