var game = new Phaser.Game(700, 392, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {


    game.load.image('arrow', 'assets/arrow.png');
    game.load.image('bullet', 'assets/purple_ball.png');
    game.load.image('test', 'assets/test.png')
    game.load.image('border', 'assets/Window.png')
    game.load.tilemap('test2', 'assets/test2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('test2tiles', 'assets/test2.png');
}

var sprite;
var bullets;

var fireRate = 100;
var nextFire = 0;
var map;
var layer;
function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0,-20, 'test2tiles');
    game.add.sprite(0,0, 'border');
    map = game.add.tilemap('test2');
    map.addTilesetImage('Tile Layer 1', 'test2tiles');
    layer = map.createLayer('World1');
//    layer.resizeWorld();
    game.stage.backgroundColor = '#0000FF';
    game.stage.backgroundImage 
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(50, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
    
    sprite = game.add.sprite(600, 350, 'arrow');
    sprite.anchor.set(0.5);

    game.physics.enable(sprite, Phaser.Physics.ARCADE);

    sprite.body.allowRotation = false;

}

function update() {

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

    game.debug.text('Active Bullets: ' + bullets.countLiving() + ' / ' + bullets.total, 32, 32);
    game.debug.spriteInfo(sprite, 32, 450);

}