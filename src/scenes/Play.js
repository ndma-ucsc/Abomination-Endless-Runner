class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        this.cameras.main.fadeIn(1500);
        this.input.keyboard.enabled = true;
        this.obstacleSpeed = -450;
        this.obstacleMin = 5000;
        this.obstacleMax = 7000;
        this.JUMP_VELOCITY = -750;
        this.MAX_JUMPS = 1;
        this.SCROLL_SPEED = 3;
        this.collisionOn = true;
        this.SCORE_MULTIPLIER = 1;
        this.physics.world.gravity.y = 3000;
        this.scoreArray = [0, 150, 500, ]; // keep track of level threshold
        // score control
        this.score = 0;
        // this.trueScore = this.score * this.SCORE_MULTIPLIER;
        this.level = 1;
        this.run = 'run';

        this.scoreTimer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.score += 1;
                this.trueScore += Math.floor(this.scoreTimer.getOverallProgress() * 5 * this.SCORE_MULTIPLIER);
            },
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

        // score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '50px',
            color: '#843605',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
        }
        this.trueScore = this.scoreTimer.getOverallProgress();
        this.scoreText = this.add.text(69, 54, this.trueScore + 'm', scoreConfig);
        

        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.gameOver = false;
    } // end of create()


    spawnObstacle() {
        let obstacle = new Obstacle(this,this.obstacleSpeed);     // create new obstacle
        obstacle.x += Phaser.Math.Between(0,300);
        this.obstacles.add(obstacle);
        console.log(`Spawned in ${this.clock.delay}s @ ${obstacle.x}`);
    }


    update(){
        if(!this.gameOver){
            this.talltrees.tilePositionX += this.SCROLL_SPEED;
            this.groundScroll.tilePositionX += this.SCROLL_SPEED;
            
            // this.clock.delay = Math.random() * 100000 + 600;
            this.clock.delay = Phaser.Math.Between(this.obstacleMin,this.obstacleMax);

            this.jumpUpdate();

            // check for collisions
            if (!collisionDebug && this.collisionOn){
                this.physics.world.collide(this.fox, this.obstacles, this.foxCollision, null, this);
            }            
            if (this.level < 9 && this.trueScore == this.scoreArray[this.level]){
                console.log('Level Up: ' + this.level);
                this.SCORE_MULTIPLIER *= 5;
                this.score = 0;
                this.level += 1;
                this.cameras.main.flash(5000);
                this.SCROLL_SPEED += 2;
                this.obstacleSpeed -= 100;
                this.obstacleMin -= 500;
                this.obstacleMax -= 500;
                // this.fox.x = game.config.width / 5;
                // this.fox.y = game.config.height - 4 * tileSize + 22;
                // this.fox.setTexture('fox_run');
                this.fox.destroy();
                this.run = 'run2';
                this.fox = this.physics.add.sprite(game.config.width / 5, game.config.height - 3 * tileSize + 22, 'fox_run').setOrigin(1);
                this.physics.add.collider(this.fox, this.ground);
                collisionDebug = true;
                this.time.delayedCall(3000, () => {this.collisionOn = false;});
            }
            this.scoreText.text = this.trueScore + 'm';
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyENTER)){
            this.input.keyboard.enabled = false;
            this.cameras.main.fadeOut(2000);
            this.time.delayedCall(2000, () => {this.scene.start("playScene");});
        }
        
    } // end of update()


    foxCollision() {
        console.log("Game Over");
        this.gameOver = true; // turn off collision checking
        // this.sound.play('death', { volume: 0.5 });  // play death sound
       
        // kill paddle
        this.fox.destroy();
        let death = this.add.sprite(this.fox.x, this.fox.y, 'death').setOrigin(1);
        death.anims.play('death').setScale(5).setOrigin(1); // explosion animation
        let gameOverTextConfig = {
            fontFamily: 'Bradley Hand',
            fontSize: '50px',
            color: '#843605',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
        }
        this.gameOverText = this.add.text(game.config.width / 2, game.config.height / 2, 'Game Over', gameOverTextConfig).setOrigin(0.5);
        this.gameOverText2 = this.add.text(game.config.width / 2, game.config.height / 2 + 50, 'Restart?', gameOverTextConfig).setOrigin(0.5)
        this.gameOverText2.fontSize = '40px';
        this.gameOverText.alpha = 0;
        this.tweens.add({
            targets: [this.gameOverText, this.gameOverText2],
            alpha: {from: 0, to: 1},
            ease: 'Linear',
            duration: 1000,
            repeat: 0
        });
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
        else{
            // this.fox.anims.play('jump', true);
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