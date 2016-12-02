class Timer {

    constructor(x, y, color, timerestart){
        this.timer;
        this.x = x;
        this.y = y;
        this.color = color;
        this.timerestart = timerestart;
        this.second = 0;
        this.minute = 0;
        this.textzerosecond = 0;
        this.textzerominute = 0;
        this.update = function(){
            this.second++;
            if (this.second > 59) {
                this.updateminute();
                this.second = 0;
            }
            if(this.second <= 9){
                this.textzerosecond = "0";
            }else{
                this.textzerosecond = "";
            }
        };
        this.create();
    }

    updateminute(){
        this.minute++;
        if(this.minute <= 9 ){
            this.textzerominute = "0";
        }else {
            this.textzerominute = "";
        }
    }

    create() {
        this.timer = game.time.create(false);
        this.timer.loop(1000, this.update, this);
        this.timer.start();
    }

    isTimeFinish(){
        return (this.minute == this.timerestart);
    }

    restart() {
        this.minute = 0;
        this.second = 0;
    }

    get() {
        return [
            this.textzerominute + this.minute,
            this.textzerosecond + this.second
        ];
    }

    draw() {
        game.debug.text("Time  " + this.textzerominute + this.minute + ":" + this.textzerosecond + this.second, this.x,this.y);//.addColor(this.color,0);
    }
}