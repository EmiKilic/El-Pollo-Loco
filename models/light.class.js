class Light extends MovableObject {
    x = 0;
    y = 0;
    width = 720;
    height = 150;

    constructor() {
        super().loadImage('/img/3. Background/Layers/1. Light/COMPLETO.png');
        this.x = Math.random() * 500;
        this.animate();
    }

    animate() {
        setInterval(() => {
         this.x -= 0.15;   
        }, 1000 / 60);
    }

}