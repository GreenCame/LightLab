var game = new Phaser.Game(1000, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

var joueur;
var lab;
var shadowTexture;
var lightSprite;
var timer;
var wait = false;
var bonus;
var malus;
var offset = 8;

function preload() {
    //joueur
    game.load.image('player', 'app/assets/img/perso.png');
    game.load.image('bonus', 'app/assets/img/bonus.png');
    game.load.image('fond', 'app/assets/img/fond.jpeg');
    game.load.image('malus', 'app/assets/img/malus.png');
}
//create
function restart(){
    //background
    var fond = game.add.sprite(0, 0, 'fond');
        fond.x = 0;
        fond.y = 0;
        fond.height = game.height;
        fond.width = game.width;

    //lab
    lab = new labyrinth(250, 60, 500, 500, 25, 3);//x, y, hauteur, largeur, incrementation, epaisseur

    //bonus
    var randomCase = lab.getRandomCaseForBonus();
    bonus = new Bonus(1, lab.getXPosition(randomCase), lab.getYPosition(randomCase));
    randomCase = lab.getRandomCaseForBonus();
    malus = new Bonus(2, lab.getXPosition(randomCase), lab.getYPosition(randomCase));
}
function createShadow() {
    //ombre
    shadowTexture = game.add.bitmapData(game.width, game.height);
    lightSprite = game.add.image(game.camera.x + offset, game.camera.y + offset, shadowTexture);
    lightSprite.blendMode = Phaser.blendModes.MULTIPLY;
}

function create() {
    restart();
    timer = new Timer(450, 50, '#fff', 2);//x, y, color, restart
    joueur = new Player('julien','0xFF0000', 7, 150, lab.getXPosition(lab.getMiddle())-offset, lab.getYPosition(lab.getMiddle())-offset, 45);//name, color, size, speed, x, y, halo
    createShadow();
}

function update() {
    //Collideur between labyrinth and player
    game.physics.arcade.collide(lab.collide(), joueur.collide());
    game.physics.arcade.overlap(joueur.collide(), bonus.collide(), overlapHandlerBonus, null, this);
    game.physics.arcade.overlap(joueur.collide(), malus.collide(), overlapHandlerMalus, null, this);
    //player move
    joueur.move();
    //check the position of joueur with labyrinth
    lab.exit(joueur);
    //if the time is over or the player find the exit
    if((lab.isFindExit() || timer.isTimeFinish()) && !wait){
        //setToFinish depend of the player situation
        joueur.finish(timer.get(), lab.isFindExit());
        timer.restart();
        //for wait the restart
        wait = true;

        //restart
        window.setTimeout(function () {
            timer.restart();
            restart();
            joueur.replace(lab.getXPosition(lab.getMiddle())-offset, lab.getYPosition(lab.getMiddle())-offset);
            createShadow();
            //ok GO ! :)
            wait = false;
        }, 10000);
    }

    //ombre
    lightSprite.reset(game.camera.x, game.camera.y);
    updateShadowTexture();
}

//gestion de l'ombre
function updateShadowTexture(){
    shadowTexture.context.fillStyle = 'rgb(0, 0, 0)';
    shadowTexture.context.fillRect(0, 0, game.width, game.height);

    var radius = joueur.getHalo() + game.rnd.integerInRange(1,6),
        heroX = joueur.collide().x - game.camera.x + offset,
        heroY = joueur.collide().y  - game.camera.y + offset;

    var gradient = shadowTexture.context.createRadialGradient(
        heroX, heroY, joueur.getHalo()  * 0.8,
        heroX, heroY, radius);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

    shadowTexture.context.beginPath();
    shadowTexture.context.fillStyle = gradient;
    shadowTexture.context.arc(heroX, heroY, radius, 0, Math.PI*2, false);
    shadowTexture.context.fill();

    shadowTexture.dirty = true;
}
//bonus
function overlapHandlerBonus(obj1, obj2) {
    joueur.setHalo(bonus.getHalo());
    obj2.kill();
}
function overlapHandlerMalus(obj1, obj2) {
    joueur.setHalo(malus.getHalo());
    obj2.kill();
}

//text
function render() {
    timer.draw();
    joueur.showTime(20, 25);
    joueur.info(20, 60);
}