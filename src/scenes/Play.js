class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        this.cameras.main.fadeIn(1500);
        if (!bgMusic.isPlaying){
            bgMusic = this.sound.add('fox1_bgm', {volume: 0.3, loop: true});
            bgMusic.play();
        }
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
        
        // score control
        this.scoreArray = [0, 300, 900, 1750, 5000, 13000, 30000, 75000, 150000]; // keep track of level threshold
        this.trueScore = 0;
        this.level = 1;
        this.fox_sprite = ['fox1','fox2','fox3','fox4','fox5','fox6','fox7','fox8','fox9'];
        this.run = this.fox_sprite[0] + '_run';        
        
        this.scoreTimer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                // this.score += 1;
                // this.trueScore += 1;
                this.trueScore += Math.floor(this.scoreTimer.getOverallProgress() * 5 * this.SCORE_MULTIPLIER);
            },
            loop: true
        });
        
        this.talltrees = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'talltrees').setOrigin(0);

        // create player sprite
        this.fox = this.physics.add.sprite(game.config.width / 5, game.config.height - 3 * tileSize + 22, this.fox_sprite[0]).setOrigin(1);

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
        this.scoreText = this.add.text(69, 54, this.trueScore + 'm', scoreConfig);
        

        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.gameOver = false;
    } // end of create()


    spawnObstacle() {
        this.obstacle_sprite = ['rock', 'hole', 'spike'];
        let obstacle = new Obstacle(this,this.obstacleSpeed, this.obstacle_sprite[Math.floor(Math.random() * 3)]);     // create new obstacle
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
            if (this.level < 9 && this.trueScore >= this.scoreArray[this.level]){
                // update level qualities
                console.log(`Level Up: ${this.level} @ ${this.scoreArray[this.level]}m`);

                this.SCORE_MULTIPLIER *= 2;
                this.level += 1;
                this.cameras.main.flash(3000);
                this.SCROLL_SPEED += 2;
                this.obstacleSpeed -= 100;
                this.obstacleMin -= 500;
                this.obstacleMax -= 500;

                // update music
                this.tweens.add({        // fade out
                    targets: bgMusic,
                    volume: 0,
                    ease: 'Linear',
                    duration: 1500,
                });
                bgMusic = this.sound.add(`${this.fox_sprite[this.level - 1]}_bgm`, {volume: 0, loop: true});                
                bgMusic.play();
                this.tweens.add({        // fade in
                    targets: bgMusic,
                    volume: 0.3,
                    ease: 'Linear',
                    duration: 1500
                });
                
                // update fox sprite
                this.fox.destroy();
                this.run = this.fox_sprite[this.level - 1] + '_run';
                this.fox = this.physics.add.sprite(game.config.width / 5, game.config.height - 3 * tileSize + 22, this.fox_sprite[this.level - 1]).setOrigin(1);
                this.physics.add.collider(this.fox, this.ground);

                // i-frame buffer
                this.collisionOn = false;
                this.time.delayedCall(3000, () => {this.collisionOn = true;});
            }
            this.scoreText.text = this.trueScore + 'm';
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyENTER)){
            this.input.keyboard.enabled = false;
            this.tweens.add({        // fade out
                targets: bgMusic,
                volume: 0,
                ease: 'Linear',
                duration: 1000
            });
            this.time.delayedCall(1000, () => {bgMusic.stop();})
            this.cameras.main.fadeOut(1500);
            this.time.delayedCall(2000, () => {this.scene.start("playScene");});
        }
        
    } // end of update()


    foxCollision() {
        console.log("Game Over");
        this.gameOver = true; // turn off collision checking
        // this.sound.play('death', { volume: 0.3 });  // play death sound
       
        this.tweens.add({        // fade out
            targets: bgMusic,
            volume: 0,
            ease: 'Linear',
            duration: 400,
        });
        bgMusic = this.sound.add('death_bgm', {volume: 0, loop: true});                
        bgMusic.play();
        this.tweens.add({        // fade in
            targets: bgMusic,
            volume: 0.3,
            ease: 'Linear',
            duration: 1000
        });

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
        if(Phaser.Input.Keyboard.JustDown(cursors.up) && this.fox.isGrounded){
            this.sound.play('jump_sfx', {volume: 2});
        }

	    if(this.fox.isGrounded) {
            this.fox.anims.play(this.run, true);
	    	this.jumps = this.MAX_JUMPS;
	    	this.jumping = false;
        }
        else{
            // this.fox.anims.play('jump', true);
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