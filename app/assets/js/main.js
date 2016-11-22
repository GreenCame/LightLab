var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    //nos fichiers
}

function create() {
    //var timer = Timer(x, y, color, size)
    var lab = new labyrinth(50, 50, 500, 500, 20);//(x, y, hauteur, largeur, case)
    lab.draw();
    //STEP 1
        //var joueur = Joueur(name, x, y, key1, key2, key3, key4, size, color)
        //var joueur2 = Joueur(name, x, y, key1, key2, key3, key4, size, color)
    //STEP  2
        //var joueur = Joueur(name, x, y, key1, key2, key3, key4, size, color, ombre)
}

function update() {
    //timer.restart();
    //timer.draw()
    //joueur.draw();
}