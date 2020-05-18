////////////////////////////////////////////////////////////////////////////////////
// Developed by Nathan Ma, Sam Nguyen, Victor Chung
// Published by Abomination
// A Kitsune's Dream
// This game revolves around the story of the nine-tailed fox, the Kitsune.
// As the player advances into the game, the fox will change forms,
// and grow up to nine tails to signify the players progression.
// This game implements a changing sprite each time the fox grows a new tail.
// This group has acheived phenomenal art for each sprite and background.
// Date of Completion: May 3rd, 2020
////////////////////////////////////////////////////////////////////////////////////

"use strict";

// global variables
let cursors;
let currentScene = 0;
const SCALE = 0.5;
const tileSize = 30;

let config = {
  type: Phaser.AUTO,
  title: "A Kitsune's Dream",
  scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 1100,
      height: 680,
  },
  physics:{
    default: 'arcade',
    arcade:{
      fps: 240,
      gravity: {y: 1000},
      debug: false
    }
  },
  scene: [Load, Opening, Menu, Option, Play, GameOver]
};

let game = new Phaser.Game(config);

// reserve some keyboard variables
let keyF, keyP, keyLEFT, keyRIGHT, keyUP, keyDOWN, keyENTER;
let bgMusic;
let volPt = 5;
let bg_volume = 0.5;
let collisionDebug = false;