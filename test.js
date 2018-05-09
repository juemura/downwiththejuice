var game = new Phaser.Game(700, 392, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('assets/TitleScreen.jpg');
}

function update (){
    if 'x: >= 22' + game.input.mousePointer.x 
      '  y: >=22' + game.input.mousePointer.y {
          game.load.image('assests/jiuce1');
      }

}
