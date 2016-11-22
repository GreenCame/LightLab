class labyrinth {
    constructor(x, y, hauteur, largeur, incrementation) {
        this.hauteur = hauteur;
        this.largeur = largeur;
        this.incrementation = incrementation;
        this.xBase = x;
        this.yBase = y;
        this.x = 0;
        this.y = 0;
        this.labyrinth = this.createArray();
        this.sortie = this.randomSortie();
        this.track = this.findTrack();
        //constructLabyrinth();
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
            this.x = 0;
        }
        return tab;
    }

    findTrack(){
        //var position = 12;
        var position = Math.floor((this.labyrinth.length+1)/2);
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
        var graphics = game.add.graphics(this.xBase, this.yBase);
        graphics.lineStyle(3, 0xA44040, 1);
        /*var indexTrack;
        for(var i = 0; i<this.getTotalNb() ; i++){
            var x = this.labyrinth[i].x - this.incrementation/2;
            var y = this.labyrinth[i].y - this.incrementation/2;
            graphics.moveTo(x, y);
        }*/
        for(var i = 0; i<this.track.length ; i++){
            var x = this.labyrinth[this.track[i]].x - this.incrementation/2;
            var y = this.labyrinth[this.track[i]].y - this.incrementation/2;
            graphics.moveTo(x, y);
            if(i==0){
                if(this.labyrinth[this.track[i]].id-this.getColNb()!=this.labyrinth[this.track[i+1]].id)graphics.lineTo(this.up(x), y);
                graphics.moveTo(this.up(x), y);
                if(this.labyrinth[this.track[i]].id+1!=this.labyrinth[this.track[i+1]].id)graphics.lineTo(this.up(x), this.up(y));
                graphics.moveTo(this.up(x), this.up(y));
                if(this.labyrinth[this.track[i]].id+this.getColNb()!=this.labyrinth[this.track[i+1]].id)graphics.lineTo(x, this.up(y));
                graphics.moveTo(x, this.up(y));
                if(this.labyrinth[this.track[i]].id-1!=this.labyrinth[this.track[i+1]].id) graphics.lineTo(x, y);
            } else if (i+1 == this.track.length){
                if(this.labyrinth[this.track[i]].id-this.getColNb()!=this.labyrinth[this.track[i-1]].id && !this.checkRowBefore(this.labyrinth[this.track[i]].id) && this.labyrinth[this.track[i]].first && this.labyrinth[this.track[i]].last)graphics.lineTo(this.up(x), y);
                graphics.moveTo(this.up(x), y);
                if(this.labyrinth[this.track[i]].id+1!=this.labyrinth[this.track[i-1]].id && !this.labyrinth[this.track[i-1]].last)graphics.lineTo(this.up(x), this.up(y));
                graphics.moveTo(this.up(x), this.up(y));
                if(this.labyrinth[this.track[i]].id+this.getColNb()!=this.labyrinth[this.track[i-1]].id && !this.checkRowAfter(this.labyrinth[this.track[i]].id) && this.labyrinth[this.track[i]].first && this.labyrinth[this.track[i]].last)graphics.lineTo(x, this.up(y));
                graphics.moveTo(x, this.up(y));
                if(this.labyrinth[this.track[i]].id-1!=this.labyrinth[this.track[i-1]].id && !this.labyrinth[this.track[i-1]].first) graphics.lineTo(x, y);
            }
            else {
                if(this.labyrinth[this.track[i]].id-this.getColNb()!=this.labyrinth[this.track[i+1]].id && this.labyrinth[this.track[i]].id-this.getColNb()!=this.labyrinth[this.track[i-1]].id)graphics.lineTo(this.up(x), y);
                graphics.moveTo(this.up(x), y);
                if(this.labyrinth[this.track[i]].id+1!=this.labyrinth[this.track[i+1]].id && this.labyrinth[this.track[i]].id+1!=this.labyrinth[this.track[i-1]].id)graphics.lineTo(this.up(x), this.up(y));
                graphics.moveTo(this.up(x), this.up(y));
                if(this.labyrinth[this.track[i]].id+this.getColNb()!=this.labyrinth[this.track[i+1]].id && this.labyrinth[this.track[i]].id+this.getColNb()!=this.labyrinth[this.track[i-1]].id)graphics.lineTo(x, this.up(y));
                graphics.moveTo(x, this.up(y));
                if(this.labyrinth[this.track[i]].id-1!=this.labyrinth[this.track[i+1]].id && this.labyrinth[this.track[i]].id-1!=this.labyrinth[this.track[i-1]].id) graphics.lineTo(x, y);
            }
        }
    }


        /*var squares = [];

        for(var i = 0; i<this.getColNb() ; i++){
            for(var u = 0; u<this.getRowNb() ; u++) {
                var square = [];
                var display = true;

                square.push({'x': this.x, 'y': this.y});
                if((i!=0) && (u!=0)) {
                    //Première ligne
                    if(!squares[i-1][3]){
                        display = false;
                    } else if ((u!=0) && this.randomLine()) {
                        display = false;
                    }
                    square.push({'display': display, 'x': this.up(this.x), 'y': this.y});

                    //Deuxième ligne
                    //if((i+1)==this.getColNb())
                    display = true;
                    if ((i!=this.getColNb()) && this.randomLine()) {
                        //display = false;
                    }
                    square.push({'display': display, 'x': this.up(this.x), 'y': this.up(this.y)});

                    //Troisième ligne
                    //if((u+1)==this.getRowNb())
                    display = true;
                    if ((i!=this.getColNb()) && this.randomLine()) {
                        //display = false;
                    }
                    square.push({'display': display, 'x': this.x, 'y': this.up(this.y)});

                    //Quatrième ligne
                    //if((u+1)==this.getRowNb())
                    display = true;

                    square.push({'display': display, 'x': this.x, 'y': this.y});
                } else {
                    square.push({'display': true, 'x': this.up(this.x), 'y': this.y});
                    square.push({'display': true, 'x': this.up(this.x), 'y': this.up(this.y)});
                    square.push({'display': true, 'x': this.x, 'y': this.up(this.y)});
                    square.push({'display': true, 'x': this.x, 'y': this.y});
                }
                squares.push(square);
                this.y += this.incrementation;
            }
            this.y = 0;
            this.x += this.incrementation;
        }
        return squares;*/

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
    checkCaseBefore(position){
        return (this.getTotalNb()/position+this.getRowNb()>0);
    }
    checkRowAfter(position){
        return (position+this.getRowNb()<this.getTotalNb());
    }
    checkCaseAfter(position){
        return (position+this.getRowNb()<this.getColNb());
    }
    random(min, max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
    randomLine(){
        return Math.random() >= 0.6
    }
}