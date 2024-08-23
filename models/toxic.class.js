class Toxic extends MovableObject {
  height = 70;
  width = 50;

  IMAGES_TOXIC_PNG = [
    "img/4. Marcadores/Posión/Animada/1.png",
    "img/4. Marcadores/Posión/Animada/2.png",
    "img/4. Marcadores/Posión/Animada/3.png",
    "img/4. Marcadores/Posión/Animada/4.png",
    "img/4. Marcadores/Posión/Animada/5.png",
    "img/4. Marcadores/Posión/Animada/6.png",
    "img/4. Marcadores/Posión/Animada/7.png",
    "img/4. Marcadores/Posión/Animada/8.png",
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
