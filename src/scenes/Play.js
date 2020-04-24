class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        this.JUMP_VELOCITY = -750;
        this.MAX_JUMPS = 1;
        this.SCROLL_SPEED = 4;
        currentScene = 3;
        this.physics.world.gravity.y = 3000;

        // create player sprite
        this.fox = this.physics.add.sprite(120, game.config.height/2-tileSize, 'texture_atlas', 'fox');
        this.fox.setTexture('fox');
        
         // make ground tiles group (actual ground)
         this.ground = this.add.group();
         for(let i = 0; i < game.config.width; i += tileSize) {
             let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'texture_atlas', 'tile_block').setOrigin(0);
             groundTile.body.immovable = true;
             groundTile.body.allowGravity = false;
             this.ground.add(groundTile);
         }

         // pseudo ground
         this.groundScroll = this.add.tileSprite(0, game.config.height-tileSize, game.config.width, tileSize, 'random_tile_block').setOrigin(0);


         // set up Phaser-provided cursor key input
         cursors = this.input.keyboard.createCursorKeys();

         // add physics collider
         this.physics.add.collider(this.fox, this.ground);
 
    }

    update(){        
        this.groundScroll.tilePositionX += this.SCROLL_SPEED;
        
        // check if fox is grounded
	    this.fox.isGrounded = this.fox.body.touching.down;
	    // if so, we have jumps to spare
	    if(this.fox.isGrounded) {
            // this.fox.anims.play('walk', true);
	    	this.jumps = this.MAX_JUMPS;
	    	this.jumping = false;
	    } else {
	    	// this.fox.anims.play('jump');
	    }
        // allow steady velocity change up to a certain key down duration
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.DownDuration__anchor
	    if(this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.up, 200)) {
	        this.fox.body.velocity.y = this.JUMP_VELOCITY;
	        this.jumping = true;
	    }
        // finally, letting go of the UP key subtracts a jump
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.UpDuration__anchor
	    if(this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.up)) {
	    	this.jumps--;
	    	this.jumping = false;
	    }
    }
}