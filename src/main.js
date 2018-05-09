<<<<<<< HEAD
<<<<<<< HEAD
var game = new Phaser.Game(700, 392, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    
    game.load.image('houseY', 'assets/1stories copy 3.png');
    game.load.image('houseP', 'assets/1stories copy 4.png');
    game.load.image('houseB', 'assets/1stories copy 2.png');
    game.load.image('houseG', 'assets/1stories copy 5.png');
    game.load.image('houseR', 'assets/1stories copy.png');
    game.load.image('juice1', 'assets/juice1.png');
    game.load.image('juice2', 'assets/juice2.png');
    game.load.image('juice3', 'assets/juiceRecolor2.png');
    game.load.image('juice4', 'assets/juiceRecolor4.png');
    game.load.image('juice5', 'assets/juiceRecolor1.png');
    game.load.image('juice6', 'assets/juiceRecolor3.png');
    game.load.image('hellaTall', 'assets/HellaTall.png');
    game.load.image('road', 'assets/road.png');
//    game.load.image('cj', 'assets/photo.jpg');
    game.load.image('arrow', 'assets/arrow.png');
    game.load.image('bullet', 'assets/NewMilk.png');
    game.load.image('border', 'assets/Window.png');
//    game.load.tilemap('test2', 'assets/test2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', "assets/test2.png");
    
    game.homes = ['houseB', 'houseY', 'houseG', 'houseP', 'houseR']
    game.juiceries = ['juice2', 'juice3', 'juice4', 'juice5', 'juice6']
}
=======
var mainState = function(game){};

>>>>>>> c08fc7aacb4d745cae86efe0cde7f010e091aed0
=======
var mainState = function(game){};

>>>>>>> e02791b49ac674e074f3a2797f08d4cd66d659be

var sprite;
var bullets;
var carSpeed = 5;
var fireRate = 100;
var nextFire = 0;

var juiceriesHit = 0;
var homesHit = 0;

mainState.prototype = {

    preload : function() {
        this.game.load.image('juice1', 'assets/juice1.png');
        this.game.load.image('juice2', 'assets/juice2.png');
        this.game.load.image('hellaTall', 'assets/HellaTall.png');
    //    this.game.load.image('cj', 'assets/photo.jpg');
        this.game.load.image('arrow', 'assets/arrow.png');
        this.game.load.image('bullet', 'assets/NewMilk.png');
        this.game.load.image('border', 'assets/Window.png');
    //    this.game.load.tilemap('test2', 'assets/test2.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', "assets/test2.png");

        this.game.homes = ['juice1']
        this.game.juiceries = ['juice2']
        this.game.objectsOnScreen = []
    },

    create : function() {

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        var house = this.game.add.sprite(-200, 175, 'juice1')
        this.game.objectsOnScreen.push([house, takePoints]);

    //    var backgroundlayer = map.createLayer('Background');
        //resizes the this.game world to match the layer dimensions

        this.game.add.sprite(0,0, 'border');

        this.game.stage.backgroundColor = '#0000FF';
        this.game.stage.backgroundImage 
        bullets = this.game.add.group();
        this.game.physics.arcade.enable(bullets)
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;

        bullets.createMultiple(3, 'bullet');
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);


        sprite = this.game.add.sprite(600, 350, 'arrow');
        sprite.anchor.set(0.5);

        this.game.physics.enable(sprite, Phaser.Physics.ARCADE);

        sprite.body.allowRotation = false;


    },

    update : function() {
        // continuously add buildings
        var lastBuilding = this.game.objectsOnScreen[this.game.objectsOnScreen.length-1][0]
        if (lastBuilding.position.x >= 0) {
            var newBuilding;
            if (Math.random() < 0.80) {
                newBuilding = this.game.add.sprite(0, 175, this.game.homes[0]); // can randomize
                this.game.physics.arcade.enable(newBuilding)
                newBuilding.enableBody = true;
                newBuilding.body.immovable = true;
                newBuilding.position.x = -1 * newBuilding.width;
                newBuilding.position.y = 275 - newBuilding.height
                this.game.objectsOnScreen.push([newBuilding, takePoints]);
            } else {
                newBuilding = this.game.add.sprite(0, 175, this.game.juiceries[0]); // can randomize
                this.game.physics.arcade.enable(newBuilding)
                newBuilding.enableBody = true;
                newBuilding.body.immovable = true;
                newBuilding.position.x = -1 * newBuilding.width;
                newBuilding.position.y = 275 - newBuilding.height
                this.game.objectsOnScreen.push([newBuilding, givePoints]);
            }
        }

<<<<<<< HEAD
<<<<<<< HEAD
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 30, 'road');

    var house = game.add.sprite(-200, 175, 'juice1')
    game.objectsOnScreen = [[house, takePoints]];
    
//    var backgroundlayer = map.createLayer('Background');
    //resizes the game world to match the layer dimensions
    
    
    
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
=======
        // remove buildings that have left the screen
        var firstBuilding = this.game.objectsOnScreen[0][0]
        if (firstBuilding.position.x >= 700) {
            this.game.objectsOnScreen.shift()
        }

=======
        // remove buildings that have left the screen
        var firstBuilding = this.game.objectsOnScreen[0][0]
        if (firstBuilding.position.x >= 700) {
            this.game.objectsOnScreen.shift()
        }

>>>>>>> e02791b49ac674e074f3a2797f08d4cd66d659be
        // move all of the buildings that are on the screen
        for (var i = 0; i < this.game.objectsOnScreen.length; i++) {
            var building = this.game.objectsOnScreen[i][0];
            var callback = this.game.objectsOnScreen[i][1];
            bullets.forEach(function(bullet) {
                if (bullet.alive && building.alive && this.game.physics.arcade.overlap(building, bullet, callback, null, this)) {
                    bullet.alive = false;
                    building.alive = false;
                } else if (!bullet.alive && bullet.position.y <= 200) {
                    bullet.visible = false;
                }
            })
            building.position.x += carSpeed
        }
<<<<<<< HEAD
>>>>>>> c08fc7aacb4d745cae86efe0cde7f010e091aed0


<<<<<<< HEAD
    sprite.body.allowRotation = false;
    
    
    game.add.sprite(0,0, 'border');

}

function update() {
    // continuously add buildings
    var lastBuilding = game.objectsOnScreen[game.objectsOnScreen.length-1][0]
    if (lastBuilding.position.x >= 0) {
        var newBuilding;
        if (Math.random() < 0.80) {
            var homeIndex = Math.floor(Math.random() * game.homes.length) // 0 and length-1
            newBuilding = game.add.sprite(0, 175, game.homes[homeIndex]); // can randomize
            game.physics.arcade.enable(newBuilding)
            newBuilding.enableBody = true;
            newBuilding.body.immovable = true;
            newBuilding.position.x = -1 * newBuilding.width;
            newBuilding.position.y = 275 - newBuilding.height;
            game.world.sendToBack(newBuilding);
            game.objectsOnScreen.push([newBuilding, takePoints]);
        } else {
            var juiceriesIndex = Math.floor(Math.random() * game.juiceries.length) // 0 and length-1
            newBuilding = game.add.sprite(0, 175, game.juiceries[juiceriesIndex]); // can randomize
            game.physics.arcade.enable(newBuilding)
            newBuilding.enableBody = true;
            newBuilding.body.immovable = true;
            newBuilding.position.x = -1 * newBuilding.width;
            newBuilding.position.y = 275 - newBuilding.height;
            game.world.sendToBack(newBuilding);
            game.objectsOnScreen.push([newBuilding, givePoints]);
            
=======
        sprite.rotation = this.game.physics.arcade.angleToPointer(sprite);

        if (this.game.input.activePointer.isDown)
        {
            fire();
>>>>>>> c08fc7aacb4d745cae86efe0cde7f010e091aed0
=======


        sprite.rotation = this.game.physics.arcade.angleToPointer(sprite);

        if (this.game.input.activePointer.isDown)
        {
            fire();
>>>>>>> e02791b49ac674e074f3a2797f08d4cd66d659be
        }

    },
    
    fire: function() {

        if (this.game.time.now > nextFire && bullets.countDead() > 0)
        {
            nextFire = this.game.time.now + fireRate;

            var bullet = bullets.getFirstDead();

            bullet.reset(sprite.x - 8, sprite.y - 8);

            this.game.physics.arcade.moveToPointer(bullet, 300);
        }

    },

    render: function() {
        this.game.debug.text('Your Milkshakes on screen ' + bullets.countLiving() + ' / ' + bullets.total, 32, 32);
        this.game.debug.text('Juiceries hit: ' + juiceriesHit, 32, 44);
        this.game.debug.text('Homes hit: ' + homesHit, 32, 56);
        this.game.debug.spriteInfo(sprite, 32, 450);
    },

    givePoints: function() {
        juiceriesHit++;
    },

    takePoints: function() {
        homesHit++;
    }
<<<<<<< HEAD
<<<<<<< HEAD

}

function render() {

    game.debug.text('Your Milkshakes on screen ' + bullets.countLiving() + ' / ' + bullets.total, 32, 32);
    game.debug.text('Juiceries hit: ' + juiceriesHit, 32, 44);
    game.debug.text('Homes hit: ' + homesHit, 32, 56);
    game.debug.spriteInfo(sprite, 32, 450);

}

function givePoints() {
    juiceriesHit++;
    if (juiceriesHit % 3 == 0) {carSpeed+=2};
    if (juiceriesHit == 10){
//        game.state.start('winscreen');
    }
}

function takePoints() {
    homesHit++;
    if(homesHit == 4){
        
//        game.state.start('endscreen');
    }
}
=======
};
>>>>>>> c08fc7aacb4d745cae86efe0cde7f010e091aed0
=======
};
>>>>>>> e02791b49ac674e074f3a2797f08d4cd66d659be
