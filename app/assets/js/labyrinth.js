class labyrinth {
    constructor(x, y, hauteur, largeur, incrementation, epaisseur) {
        this.hauteur = hauteur;
        this.largeur = largeur;
        this.incrementation = incrementation;
        this.epaisseur = epaisseur;
        this.xBase = x;
        this.yBase = y;
        this.x = x;
        this.y = y;
        this.labyrinth = this.createArray();
        this.sortie = this.randomSortie();
        this.track = this.findTrack();
        this.findExit = false;
    }

    createArray(){
        var tab = [];
        var first = true;
        var last = false;
        var u = 0;
        for(var i = 0; i < this.getColNb() ; i++){
            this.y += this.incrementation;
            first = true;
            for(var y = 0; y < this.getColNb() ; y++, u++){
                this.x += this.incrementation;
                last = ((y+1)==this.getColNb())? true: false;
                tab.push({'id':u, 'first':first, 'last':last, 'x':this.x - this.incrementation/2 , 'y': this.y - this.incrementation/2 });
                first = false;
            }
            this.x = this.xBase;
        }
        return tab;
    }

    findTrack(){
        //var position = 12;
        var position = this.getMiddle();
        var track = [];
        track.push(position);
        var found = false;

        while(!found){
            var choices = [];
            //conditions
            if(this.checkRowBefore(position))choices.push(position-this.getRowNb());
            if(!this.labyrinth[position].first)choices.push(position-1);
            if(!this.labyrinth[position].last)choices.push(position+1);
            if(this.checkRowAfter(position))choices.push(position+this.getRowNb());

            //verifications
            for(var i = 0; i < track.length ; i++){
                for(var u = 0; u < choices.length ; u++){
                    if(choices[u]==track[i])choices.splice(u, 1);;
                }
            }
            //insertion
            if(choices==null)break;
            position = choices[this.random(0, choices.length-1)];
            if(position==null)break;
            track.push(position);
            if(this.sortie == position)found = true;
        }
        if(this.sortie != track[track.length-1]){
            console.log("track error ... retry");
            return this.findTrack();
        } else {
            console.log("sortie case "+this.sortie+" ! track -> "+track);
            return track;
        }
    }

    draw(){
        var horizontalBD = game.add.bitmapData( this.incrementation, this.epaisseur ); //width, height
        var verticalBD = game.add.bitmapData( this.epaisseur, this.incrementation ); //width, height
        horizontalBD.fill( 255, 255, 255, 1 ); //Red, Green, Blue, Alpha
        verticalBD.fill( 255, 255, 255, 1 ); //Red, Green, Blue, Alph

        //debug track
        /*var horizontalBD2 = game.add.bitmapData( this.incrementation, this.epaisseur ); //width, height
        var verticalBD2 = game.add.bitmapData( this.epaisseur, this.incrementation ); //width, height
        horizontalBD2.fill( 255, 255, 255, 1 ); //Red, Green, Blue, Alpha
        verticalBD2.fill( 255, 255, 255, 1 ); //Red, Green, Blue, Alpha*/
        this.groupLab = game.add.group();
        this.groupLab.enableBody = true;

        for(var i = 0; i<this.getTotalNb() ; i++){
            var x = this.labyrinth[i].x - this.incrementation/2 - this.epaisseur/2;
            var y = this.labyrinth[i].y - this.incrementation/2 - this.epaisseur/2;

            if(this.track.indexOf(this.labyrinth[i].id) == -1){
                if(!this.checkRowBefore(i)){
                    var r = this.groupLab.create(x, y, horizontalBD );
                    r.body.immovable = true;
                }
                if(this.labyrinth[i].last || this.randomLine1()){
                    var r = this.groupLab.create(this.up(x), y, verticalBD );
                    r.body.immovable = true;
                }
                if(!this.checkRowAfter(i)|| this.randomLine1()){
                    var r = this.groupLab.create(x, this.up(y), horizontalBD );
                    r.body.immovable = true;
                }
                if(this.labyrinth[i].first){
                    var r = this.groupLab.create(x, y, verticalBD );
                    r.body.immovable = true;
                }
            }
        }

        //track
        for(var i = 0; i<this.track.length ; i++){
            var x = this.labyrinth[this.track[i]].x - this.incrementation/2 - this.epaisseur/2;
            var y = this.labyrinth[this.track[i]].y - this.incrementation/2 - this.epaisseur/2;
            if(i==0){
                if(this.labyrinth[this.track[i]].id-this.getColNb()!=this.labyrinth[this.track[i+1]].id){
                    var r = this.groupLab.create(x, y, horizontalBD );
                    r.body.immovable = true;
                }
                if(this.labyrinth[this.track[i]].id+1!=this.labyrinth[this.track[i+1]].id){
                    var r = this.groupLab.create(this.up(x), y, verticalBD );
                    r.body.immovable = true;
                }
                if(this.labyrinth[this.track[i]].id+this.getColNb()!=this.labyrinth[this.track[i+1]].id){
                    var r = this.groupLab.create(x, this.up(y), horizontalBD );
                    r.body.immovable = true;
                }
                if(this.labyrinth[this.track[i]].id-1!=this.labyrinth[this.track[i+1]].id){
                    var r = this.groupLab.create(x, y, verticalBD );
                    r.body.immovable = true;
                }
            } else if (i+1 == this.track.length){
                if(this.labyrinth[this.track[i]].id-this.getColNb()!=this.labyrinth[this.track[i-1]].id && !this.checkRowBefore(this.labyrinth[this.track[i]].id) && this.labyrinth[this.track[i]].first && this.labyrinth[this.track[i]].last){
                    var r = this.groupLab.create(x, y, horizontalBD );
                    r.body.immovable = true;
                }
                if(this.labyrinth[this.track[i]].id+1!=this.labyrinth[this.track[i-1]].id && !this.labyrinth[this.track[i-1]].last){
                    var r = this.groupLab.create(this.up(x), y, verticalBD );
                    r.body.immovable = true;
                }
                if(this.labyrinth[this.track[i]].id+this.getColNb()!=this.labyrinth[this.track[i-1]].id && !this.checkRowAfter(this.labyrinth[this.track[i]].id) && this.labyrinth[this.track[i]].first && this.labyrinth[this.track[i]].last){
                    var r = this.groupLab.create(x, this.up(y), horizontalBD );
                    r.body.immovable = true;
                }
                if(this.labyrinth[this.track[i]].id-1!=this.labyrinth[this.track[i-1]].id && !this.labyrinth[this.track[i-1]].first){
                    var r = this.groupLab.create(x, y, verticalBD );
                    r.body.immovable = true;
                }
            }
            else {
                if(this.randomLine2() && this.labyrinth[this.track[i]].id-this.getColNb()!=this.labyrinth[this.track[i+1]].id && this.labyrinth[this.track[i]].id-this.getColNb()!=this.labyrinth[this.track[i-1]].id || !this.checkRowBefore(this.labyrinth[this.track[i]].id)){
                    var r = this.groupLab.create(x, y, horizontalBD );
                    r.body.immovable = true;
                }
                if(this.randomLine2() && this.labyrinth[this.track[i]].id+1!=this.labyrinth[this.track[i+1]].id && this.labyrinth[this.track[i]].id+1!=this.labyrinth[this.track[i-1]].id || this.labyrinth[this.track[i]].last){
                    var r = this.groupLab.create(this.up(x), y, verticalBD );
                    r.body.immovable = true;
                }
                if(this.randomLine2() && this.labyrinth[this.track[i]].id+this.getColNb()!=this.labyrinth[this.track[i+1]].id && this.labyrinth[this.track[i]].id+this.getColNb()!=this.labyrinth[this.track[i-1]].id || !this.checkRowAfter(this.labyrinth[this.track[i]].id)){
                    var r = this.groupLab.create(x, this.up(y), horizontalBD );
                    r.body.immovable = true;
                }
                if(this.randomLine2() && this.labyrinth[this.track[i]].id-1!=this.labyrinth[this.track[i+1]].id && this.labyrinth[this.track[i]].id-1!=this.labyrinth[this.track[i-1]].id || this.labyrinth[this.track[i]].first) {
                    var r = this.groupLab.create(x, y, verticalBD );
                    r.body.immovable = true;
                }
            }
        }
        game.physics.arcade.enable( this.groupLab );
    }

    exit(joueur){
        if((this.xBase > joueur.collide().x || (this.xBase + this.largeur) < joueur.collide().x)
            || (this.yBase > joueur.collide().y || (this.yBase + this.hauteur) < joueur.collide().y))
            this.findExit=true;
    }

    isFindExit(){
        return this.findExit;
    }

    collide(){
        return this.groupLab;
    }
    getXPosition(index){
        return this.labyrinth[index].x;
    }
    getYPosition(index){
        return this.labyrinth[index].y;
    }
    randomSortie(){
        var cases = [];
        for(var i = 0; i<this.getTotalNb() ; i++) {
            if( i < this.getRowNb() || this.labyrinth[i].first || this.labyrinth[i].last || i>this.getTotalNb()-this.getRowNb()){
                cases.push(i);
            }
        }
        return cases[this.random(0, cases.length-1)];
    }
    getColNb(){
        return Math.floor(this.largeur/this.incrementation);
    }
    getRowNb(){
        return Math.floor(this.hauteur/this.incrementation);
    }
    getTotalNb(){
        return this.getRowNb()*this.getColNb();
    }
    up(value) {
        return value += this.incrementation;
    }
    checkRowBefore(position){
        return (position-this.getRowNb()>0);
    }
    checkRowAfter(position){
        return (position+this.getRowNb()<this.getTotalNb());
    }
    random(min, max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
    randomLine1(){
        return Math.random() >= 0.52
    }
    randomLine2(){
        return Math.random() >= 0.25
    }
    getMiddle(){
        //return Math.floor(this.getTotalNb()/2);
        return 210;
    }
}