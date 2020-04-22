////////////////////////////////////////////////////////////////////////////////////
// Developed by Nathan Ma, Sam Nguyen, Victor Chung
// Published by Abomination
// <insert title here>
// This game revolves around the story of the nine-tailed fox, the Kitsune.
// As the player advances into the game, the fox will change forms,
// and grow up to nine tails to signify the players progression.
////////////////////////////////////////////////////////////////////////////////////


let config = {
  type: Phaser.CANVAS,
  width: 1280,
  height: 720,
  scene: [ Load, Menu, Play ],
};

let game = new Phaser.Game(config);

// define game settings
game.settings = {
  
}

// reserve some keyboard variables
let keyF, keyLEFT, keyRIGHT, keyUP, keyDOWN, bgMusic;