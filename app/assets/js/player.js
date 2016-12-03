class Player {
    constructor (name, color, size, speed, x, y, halo) {
        this.haloOffset = 400;
        this.name = name;
        this.color = color;
        this.size = size;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.halo = halo+this.haloOffset;
        this.haloBase = halo;
        this.essais = 1;
        this.reussite = 0;
        this.create(x, y);
    }

    create(x, y) {
        //sprite
        this.player = game.add.sprite( x ,  y , 'player');
        this.player.name = 'player';
        //this.player.scale.setTo(0.05, 0.05);

        //phaser
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        game.physics.arcade.enableBody(this.player);

        this.cursors = game.input.keyboard.createCursorKeys();
    }

    collide(){
        return this.player;
    }

    getHalo() {
       return this.halo;
    }
    setHalo (value) {
        this.halo = value;
    }

    replace (x, y) {
        this.essais++;
        this.create(x,y);
        this.setHalo(this.haloBase+this.haloOffset);
    }

    finish(time, save){
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;

        this.setHalo(10000);

        if(save){
            this.reussite++;
            this.saveTime(time);
        }
    }

    showTime(x, y){
        if(this.time !== undefined){
            game.debug.text("Best score " + this.time[0] + ":" + this.time[1], x, y);//.addColor(this.color,0);
        }
    }

    move() {
        if(this.halo>this.haloBase){
            this.halo-=3;
        } else if (this.halo<this.haloBase) {
            this.halo+=0.1;
        }

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

    //save time
    saveTime(time) {
        if(this.time === undefined){
            this.time = time;
        } else {
            if(time[0]<=this.time[0] && time[1]<this.time[1]){
                this.time = time;
            }
        }
    }

    //info joueur
    info(x, y){
        game.debug.text("Reussite : " + this.reussite + "/" + this.essais, x, y);
    }
}