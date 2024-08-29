class Light extends MovableObject {
  x = 0;
  y = 0;
  width = 720;
  height = 150;

  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 500;
    this.animate();
  }

  animate() {
    this.moveLeft();
  }
}
