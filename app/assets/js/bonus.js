class Bonus {

    //var bonus;

    constructor(type, x, y) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.create();
    }

    create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        if (this.type == 1) {
            this.bonus = game.add.sprite( this.x-8 ,  this.y-8 , 'bonus');
        }
        if (this.type == 2) {
            this.bonus = game.add.sprite( this.x-8 ,  this.y-8 , 'malus');
        }

        game.physics.arcade.enable(this.bonus, Phaser.Physics.ARCADE);
    }

    collide(){
        return this.bonus;
    }

    getHalo() {
        var value;
        if (this.type == 1) {
            value = 600;
        }
        if (this.type == 2) {
            value = 0;
        }

        return value;
    }
}