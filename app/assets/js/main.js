var game = new Phaser.Game(1000, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
var joueur;
var lab;
var shadowTexture;
var lightSprite;
var timer;

function preload() {
    game.load.image('mushroom', 'app/assets/img/index.jpeg');
}

function create() {
    //lab
    lab = new labyrinth(250, 60, 500, 500, 25, 3);//(x, y, hauteur, largeur, case)
    lab.draw();

    //timer
    timer = new Timer(450, 50, '#fff', 1);

    //joueur
    joueur = new Player('julien','0xFF0000', 7, 120, lab.getXPosition(lab.getMiddle()), lab.getYPosition(lab.getMiddle()), 160);
    joueur.create();

    //ombre
    shadowTexture = game.add.bitmapData(game.width, game.height);
    lightSprite = game.add.image(game.camera.x, game.camera.y, shadowTexture);
    lightSprite.blendMode = Phaser.blendModes.MULTIPLY;
}

function update() {
    game.physics.arcade.collide(lab.collide(), joueur.collide());
    joueur.move();
    lab.exit(joueur);
    if(lab.isFindExit() || timer.isTimeFinish()){
        if(lab.isFindExit()){
            joueur.finish(timer.get(), true);
            timer.restart();
        } else {
            joueur.finish(timer.get(), false);
        }
        game.stage.backgroundColor = '#000000';
        /*lab = new labyrinth(250, 60, 500, 500, 25, 3);//(x, y, hauteur, largeur, case)
        lab.draw();*/
        joueur.replace(lab.getXPosition(lab.getMiddle()), lab.getYPosition(lab.getMiddle()));
    }
    lightSprite.reset(game.camera.x, game.camera.y);
    updateShadowTexture();
}

function updateShadowTexture(){
    shadowTexture.context.fillStyle = 'rgb(0, 0, 0)';
    shadowTexture.context.fillRect(0, 0, this.game.width, this.game.height);

    var radius = joueur.getHalo() + game.rnd.integerInRange(1,6),
        heroX = joueur.collide().x - game.camera.x,
        heroY = joueur.collide().y - game.camera.y;

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
}