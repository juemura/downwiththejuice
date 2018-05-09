var mainState = function(game){};


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

        // remove buildings that have left the screen
        var firstBuilding = this.game.objectsOnScreen[0][0]
        if (firstBuilding.position.x >= 700) {
            this.game.objectsOnScreen.shift()
        }

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


        sprite.rotation = this.game.physics.arcade.angleToPointer(sprite);

        if (this.game.input.activePointer.isDown)
        {
            fire();
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
};