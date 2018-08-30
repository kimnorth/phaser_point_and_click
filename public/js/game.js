// Initialize Phaser, and create a 800px by 600px game
var game = new Phaser.Game(800, 600);

// Add the 'mainState' and call it 'main'
game.state.add('boot', bootState);
game.state.add('load', loadState); 
game.state.add('menu', menuState); 
game.state.add('play', playState); 
// game.state.add('gameOver', gameOverState); 

// Start the state to actually start the game

game.state.start('boot');