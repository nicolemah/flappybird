// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };
var score = 0;
var player;
var pipes;


// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("playerImg","assets/tweety03.png");
    game.load.audio("score", "assets/audio1.mp3");
    game.load.image("pipe", "assets/pipe_mint.png");
    game.load.audio("game_over","assets/audio2.mp3");


}

/*
 * Initialises the game. This function is only called once.
 */
function create() {

    game.stage.setBackgroundColor("#B6ECFF");
    game.add.text(245,175,"I tought I taw a puddy tat!",{font:"30px Calibri",fill:"#29297A"});

    game.physics.startSystem(Phaser.Physics.ARCADE);
    var x = 10;
    var y = 100;
    player = game.add.sprite(80,175, "playerImg");
    game.physics.arcade.enable(player);
    //player.body.velocity.x=100;
    //player.body.velocity.y=-50;
    player.body.gravity.y=10;

    pipes = game.add.group();
    //generate_pipe();
    game.time.events.loop(2.5*Phaser.Timer.SECOND,generate_pipe);


    //player = game.add.sprite(x,y,"playerImg");
    //player.x = 120;
    //player.y = 50;

    game.input.onDown.add(clickHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);
    changeScore();
    //alert(score);

    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(player_jump);


}

function player_jump(event){
    player.body.velocity.y=-100;
}

function add_pipe_part (x,y, pipe_part) {
    var pipe = pipes.create(x, y, pipe_part);
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x= -200;
}

function generate_pipe (){
    var gap_start = game.rnd.integerInRange(1, 5);

    for(var count =0; count <=8; count ++) {
        if(count != gap_start && count!= gap_start + 1){
            //game.add.sprite(0, count * 50, "pipe");
           add_pipe_part(800, count * 50, "pipe");
        }
    }
    }


function game_over(){
   //game.paused = true;
   game.reload();
    game.sound.play("score");

}
/*
 * This function updates the scene. It is called for every new frame.
 */

function update() {
    game.physics.arcade.overlap(player,pipes,game_over);

}

function clickHandler(event) {
    //alert(event.x + ":" + event.y);
    game.add.sprite(event.x, event.y,"playerImg");
}

function spaceHandler(event) {
    //game.sound.play("score");
}

function changeScore (){
    score = score + 1;
}

function moveLeft (event) {
    player.x-=3;
}

function moveRight (event){
    player.x+=3;
    player.body.velocity.x=5;
}

function moveUp (event) {
    player.y-=6;
    player.body.velocity.y=-100;
}

function moveDown (event) {
    player.y+=6;
    player.body.gravity.y=200;
}

