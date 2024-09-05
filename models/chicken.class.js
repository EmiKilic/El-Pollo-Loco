class Chicken extends MovableObject {
  y = 350;
  height = 80;
  width = 80;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 500 + Math.random() * 2000;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
  }

  animate() {
    setInterval(() => (this.otherDirection = !this.otherDirection), 5000);
    setInterval(() => {
      if (!this.isDeadEndboss())
        this.otherDirection ? this.moveRight() : this.moveLeft();
    }, 1000 / 60);
    setInterval(
      () =>
        this.playAnimation(
          this.isDeadEndboss() ? this.IMAGES_DEAD : this.IMAGES_WALKING
        ),
      200
    );
  }
}
