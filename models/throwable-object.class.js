class ThrowableObject extends MovableObject {

    IMAGE_ROTATION = [
        "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGE_ROTATION);
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 30;
        this.throw();
    }

    throw() {
        this.speedY = 30
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
        setInterval(() => {
            this.playAnimation(this.IMAGE_ROTATION);
        }, 100);
    }

}   