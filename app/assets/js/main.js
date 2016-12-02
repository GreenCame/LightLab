var game = new Phaser.Game(1000, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

var joueur;
var lab;
var shadowTexture;
var lightSprite;
var timer;
var wait = false;

function preload() {
    //joueur
    game.load.image('mushroom', 'app/assets/img/index.jpeg');
}

function create() {
    //lab
    lab = new labyrinth(250, 60, 500, 500, 25, 3);//x, y, hauteur, largeur, incrementation, epaisseur
    lab.draw();

    //timer
    timer = new Timer(450, 50, '#fff', 5);//x, y, color, restart

    //joueur
    joueur = new Player('julien','0xFF0000', 7, 120, lab.getXPosition(lab.getMiddle()), lab.getYPosition(lab.getMiddle()), 40);//name, color, size, speed, x, y, halo

    //ombre
    shadowTexture = game.add.bitmapData(game.width, game.height);
    lightSprite = game.add.image(game.camera.x, game.camera.y, shadowTexture);
    lightSprite.blendMode = Phaser.blendModes.MULTIPLY;
}

function update() {
    //Collideur between labyrinth and player
    game.physics.arcade.collide(lab.collide(), joueur.collide());
    //player move
    joueur.move();
    //check the position of joueur with labyrinth
    lab.exit(joueur);
    //if the time is over or the player find the exit
    if((lab.isFindExit() || timer.isTimeFinish()) && !wait){
        //setToFinish depend of the player situation
        joueur.finish(timer.get(), lab.isFindExit());
        //restart time
        timer.restart();
        //for wait the restart
        wait = true;

        //restart
        window.setTimeout(function () {
            //Timer
            timer.restart();
            //background
            var black = game.add.bitmapData(game.width, game.height);
                black.context.fillStyle = 'rgb(0, 0, 0)';
                black.context.fillRect(0, 0, game.width, game.height);
                black.context.beginPath();
                black.context.fill();
            game.add.image(game.camera.x, game.camera.y, black);
            //lab
            lab = new labyrinth(250, 60, 500, 500, 25, 3);//(x, y, hauteur, largeur, case)
            lab.draw();
            //ombre
            shadowTexture = game.add.bitmapData(game.width, game.height);
            lightSprite = game.add.image(game.camera.x, game.camera.y, shadowTexture);
            lightSprite.blendMode = Phaser.blendModes.MULTIPLY;
            joueur.replace(lab.getXPosition(lab.getMiddle()), lab.getYPosition(lab.getMiddle()));
            //ok RESTART ! :)
            wait = false;
        }, 5000);
    }

    //ombre
    lightSprite.reset(game.camera.x, game.camera.y);
    updateShadowTexture();
}

//gestion de l'ombre
function updateShadowTexture(){
    shadowTexture.context.fillStyle = 'rgb(0, 0, 0)';
    shadowTexture.context.fillRect(0, 0, game.width, game.height);

    var radius = joueur.getHalo() + game.rnd.integerInRange(1,6);
    var heroX = joueur.collide().x - game.camera.x;
    var heroY = joueur.collide().y - game.camera.y;

    var gradient = shadowTexture.context.createRadialGradient(
        heroX, heroY, joueur.getHalo()  * 0.65,
        heroX, heroY, radius);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

    shadowTexture.context.beginPath();
    shadowTexture.context.fillStyle = gradient;
    shadowTexture.context.arc(heroX, heroY, radius, 0, Math.PI*2, false);
    shadowTexture.context.fill();

    shadowTexture.dirty = true;
}

function render() {
    timer.draw();
    joueur.showTime(20, 25);
    joueur.info(20, 60);
}