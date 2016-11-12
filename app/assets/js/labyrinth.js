class labyrinth {
     constructor(hauteur, largeur, incrementation) {
        this.hauteur = hauteur;
        this.largeur = largeur;
        this.incrementation = incrementation;
        this.x = 0;
        this.y = 0;
         this.sortie = {
             x: (Math.random() * this.getColNb()),
             y: (Math.random() * this.getRowNb())
         };
    }

    draw(){
        var graphics = game.add.graphics(10, 10);
        graphics.lineStyle(3, 0xffffff, 1);

        for(var i = 0; i<this.getColNb() ; i++){
            for(var u = 0; u<this.getRowNb() ; u++) {
                //square(this.x, this.y);
                graphics.moveTo(this.x, this.y);

                if(u==0){
                    graphics.lineTo(this.up(this.x), this.y);
                } else if (this.randomLine()){
                    graphics.lineTo(this.up(this.x), this.y);
                }
                graphics.moveTo(this.up(this.x), this.y);

                if((i+1)==this.getColNb()){
                    graphics.lineTo(this.up(this.x), this.up(this.y));
                } else if (this.randomLine()){
                    graphics.lineTo(this.up(this.x), this.up(this.y));
                }
                graphics.moveTo(this.up(this.x), this.up(this.y));

                if((u+1)==this.getRowNb()){
                    graphics.lineTo(this.x, this.up(this.y));
                } else if (this.randomLine()){
                    graphics.lineTo(this.x, this.up(this.y));
                }
                graphics.moveTo(this.x, this.up(this.y));

                if(i==0){
                    graphics.lineTo(this.x, this.y);
                } else if (this.randomLine()){
                    graphics.lineTo(this.x, this.y);
                }
                graphics.moveTo(this.x, this.y);

                this.y += this.incrementation;
            }
            this.y = 0;
            this.x += this.incrementation;
        }
    }

    getColNb(){
        return Math.floor(this.largeur/this.incrementation);
    }
    getRowNb(){
        return Math.floor(this.hauteur/this.incrementation);
    }
    up(value) {
        return value += this.incrementation;
    }
    randomLine(){
        return Math.random() >= 0.5;
    }
}