class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        this.obstacleSpeed = -450;
        this.JUMP_VELOCITY = -750;
        this.MAX_JUMPS = 1;
        this.SCROLL_SPEED = 3;
        this.physics.world.gravity.y = 3000;
        this.score = 4;
        this.multiplier = 2;
        this.run = 'run';

        this.scoreTimer = this.time.addEvent({
            delay: 1000,
            callback: () => {this.score += 1;},
            loop: true
        });

        this.talltrees = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'talltrees').setOrigin(0);

        // create player sprite
        this.fox = this.physics.add.sprite(game.config.width / 5, game.config.height - 3 * tileSize + 22, 'fox').setOrigin(1);

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

        // add physics collider
        this.physics.add.collider(this.fox, this.ground);

        // add obstacles
        // set up barrier group and add first barrier to kick things off
        this.obstacles = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();
        
        this.clock = this.time.addEvent({
            delay: 5000,
            callback: this.spawnObstacle,
            callbackScope: this,
            loop: true
        });
        this.gameOver = false;
    } // end of create()

    spawnObstacle() {
        let obstacle = new Obstacle(this,this.obstacleSpeed);     // create new obstacle
        this.obstacles.add(obstacle);
    }

    update(){
        if(!this.gameOver){
            this.talltrees.tilePositionX += this.SCROLL_SPEED;
            this.groundScroll.tilePositionX += this.SCROLL_SPEED;
            
            // this.clock.delay = Math.random() * 100000 + 600;
            this.clock.delay = Phaser.Math.Between(5000,7000);

            this.jumpUpdate();

            // check for collisions
            if (!collisionDebug){
                this.physics.world.collide(this.fox, this.obstacles, this.foxCollision, null, this);
            }

            if (this.score >= this.multiplier * 5){
                this.score = 0;
                this.multiplier += 1;
                console.log('here');
                this.cameras.main.flash(5000);
                this.fox.y = game.config.height - 3 * tileSize + 22;
                this.fox.setTexture('foxy');
                this.run = 'run2';
                collisionDebug = true;
                this.time.delayedCall(3000, () => {collisionDebug = false;});
            }
        }

    } // end of update()

    foxCollision() {
        this.gameOver = true; // turn off collision checking
        // this.sound.play('death', { volume: 0.5 });  // play death sound
       
        // kill paddle
        this.fox.destroy();
        let death = this.add.sprite(this.fox.x, this.fox.y, 'death').setOrigin(1);
        death.anims.play('death').setScale(5).setOrigin(1); // explosion animation
    }

    jumpUpdate(){
        // check if fox is grounded
	    this.fox.isGrounded = this.fox.body.touching.down;
	    // if so, we have jumps to spare
	    if(this.fox.isGrounded) {
            this.fox.anims.play(this.run, true);
	    	this.jumps = this.MAX_JUMPS;
	    	this.jumping = false;
        }
        if(Phaser.Input.Keyboard.JustDown(cursors.up) && this.fox.isGrounded){
            this.sound.play('jump_sfx');
        }
        // allow steady velocity change up to a certain key down duration
	    if(this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.up, 200)) {
	        this.fox.body.velocity.y = this.JUMP_VELOCITY;
            this.jumping = true;
	    }
        // finally, letting go of the UP key subtracts a jump
	    if(this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.up)) {
	    	this.jumps--;
            this.jumping = false;            
	    }
    }
}