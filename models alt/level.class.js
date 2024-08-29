class Level {
    enemies;
    toxin;
    coin;
    light;
    backgroundObjects;
    level_end_x = 700;

    constructor(enemies, toxin, coin, light, backgroundObjects) {
        this.enemies = enemies;
        this.toxin = toxin;
        this.coin = coin;
        this.light = light;
        this.backgroundObjects = backgroundObjects;
    }
}