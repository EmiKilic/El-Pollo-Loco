class Chicken extends MovableObject {
  height = 50;
  width = 50;
  IMAGES_SWIMMING = [
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png",
  ];
  currentImage = 0;

  constructor() {
    super().loadImage(
      "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png"
    );
    this.loadImages(this.IMAGES_SWIMMING);

    this.x = 200 + Math.random() * 500;
    this.y = 0 + Math.random() * 300;
    this.animate();
  }

  animate() {
    this.moveLeft();
    
    setInterval(() => {
      let i = this.currentImage % this.IMAGES_SWIMMING.length;
      let path = this.IMAGES_SWIMMING[i];
      this.img = this.ImageCache[path];
      this.currentImage++;
    }, 150);
  }
}
