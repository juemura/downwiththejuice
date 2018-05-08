var game = new Phaser.Game(700, 392, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.image('juice1', 'assets/juice1.png');
    game.load.image('juice2', 'assets/juice2.png');
    game.load.image('hellaTall', 'assets/HellaTall.png');
//    game.load.image('cj', 'assets/photo.jpg');
    game.load.image('arrow', 'assets/arrow.png');
    game.load.image('bullet', 'assets/NewMilk.png');
    game.load.image('border', 'assets/Window.png');
//    game.load.tilemap('test2', 'assets/test2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', "assets/test2.png");
    
    game.homes = ['juice1']
    game.juiceries = ['juice2']
}

var sprite;
var bullets;
var carSpeed = 5;
var fireRate = 100;
var nextFire = 0;

var juiceriesHit = 0;
var homesHit = 0;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    var house = game.add.sprite(-200, 175, 'juice1')
    game.objectsOnScreen = [[house, takePoints]];
    
//    var backgroundlayer = map.createLayer('Background');
    //resizes the game world to match the layer dimensions
    
    game.add.sprite(0,0, 'border');
    
    game.stage.backgroundColor = '#0000FF';
    game.stage.backgroundImage 
    bullets = game.add.group();
    game.physics.arcade.enable(bullets)
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    
    bullets.createMultiple(3, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
    
    
    sprite = game.add.sprite(600, 350, 'arrow');
    sprite.anchor.set(0.5);

    game.physics.enable(sprite, Phaser.Physics.ARCADE);

    sprite.body.allowRotation = false;
    

}

function update() {
    // continuously add buildings
    var lastBuilding = game.objectsOnScreen[game.objectsOnScreen.length-1][0]
    if (lastBuilding.position.x >= 0) {
        var newBuilding;
        if (Math.random() < 0.80) {
            newBuilding = game.add.sprite(0, 175, game.homes[0]); // can randomize
            game.physics.arcade.enable(newBuilding)
            newBuilding.enableBody = true;
            newBuilding.body.immovable = true;
            newBuilding.position.x = -1 * newBuilding.width;
            newBuilding.position.y = 275 - newBuilding.height
            game.objectsOnScreen.push([newBuilding, takePoints]);
        } else {
            newBuilding = game.add.sprite(0, 175, game.juiceries[0]); // can randomize
            game.physics.arcade.enable(newBuilding)
            newBuilding.enableBody = true;
            newBuilding.body.immovable = true;
            newBuilding.position.x = -1 * newBuilding.width;
            newBuilding.position.y = 275 - newBuilding.height
            game.objectsOnScreen.push([newBuilding, givePoints]);
        }
    }
    
    // remove buildings that have left the screen
    var firstBuilding = game.objectsOnScreen[0][0]
    if (firstBuilding.position.x >= 700) {
        game.objectsOnScreen.shift()
    }

    // move all of the buildings that are on the screen
    for (var i = 0; i < game.objectsOnScreen.length; i++) {
        var building = game.objectsOnScreen[i][0];
        var callback = game.objectsOnScreen[i][1];
        bullets.forEach(function(bullet) {
            if (bullet.alive && building.alive && game.physics.arcade.overlap(building, bullet, callback, null, this)) {
                bullet.alive = false;
                building.alive = false;
            } else if (!bullet.alive && bullet.position.y <= 200) {
                bullet.visible = false;
            }
        })
        building.position.x += carSpeed
    }
    

    sprite.rotation = game.physics.arcade.angleToPointer(sprite);

    if (game.input.activePointer.isDown)
    {
        fire();
    }

}

function fire() {

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstDead();

        bullet.reset(sprite.x - 8, sprite.y - 8);

        game.physics.arcade.moveToPointer(bullet, 300);
    }

}

function render() {

    game.debug.text('Your Milkshakes on screen ' + bullets.countLiving() + ' / ' + bullets.total, 32, 32);
    game.debug.text('Juiceries hit: ' + juiceriesHit, 32, 44);
    game.debug.text('Homes hit: ' + homesHit, 32, 56);
    game.debug.spriteInfo(sprite, 32, 450);

}

function givePoints() {
    juiceriesHit++;
}

function takePoints() {
    homesHit++;
}