class Player {

    //var player;

    constructor (name, color, size, speed, x, y, halo) {
        this.name = name;
        this.color = color;
        this.size = size;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.halo = halo;
    }

    create() {
        this.player = game.add.sprite( this.x ,  this.y , 'mushroom');
        this.player.name = 'mushroom';
        this.player.scale.setTo(0.05, 0.05);
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        game.physics.arcade.enableBody(this.player);

        this.cursors = game.input.keyboard.createCursorKeys();
    }

    collide(){
        return this.player;
    }

    getHalo (value) {
       return this.halo;
    }
    setHalo (value) {
        this.halo = value;
    }
    replace (x, y) {
        this.player.body.x = x;
        this.player.body.y = y;
    }


    finish(time, save){
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;

        this.setHalo(1000);

        if(save){
            this.saveTime(time);
        }
    }

    showTime(x, y){
        if(this.time !== undefined){
            game.debug.text("Best score " + this.time[0] + ":" + this.time[1], x, y);//.addColor(this.color,0);
        }
    }

    move() {
        //this.player.body.setZeroVelocity();

        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -this.speed;
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x  = this.speed;
        }

        if (this.cursors.up.isDown) {
            this.player.body.velocity.y = -this.speed;
        }
        else if (this.cursors.down.isDown) {
            this.player.body.velocity.y  = this.speed;
        }
        return this.player;
    }

    saveTime(time) {
        if(this.time === undefined){
            this.time = time;
        } else {
            if(time[0]<this.time[0] && time[1]<this.time[1]){
                this.time = time;
            }
        }
    }
}