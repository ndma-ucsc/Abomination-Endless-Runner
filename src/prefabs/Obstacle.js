class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        // call Phaser Physics Sprite constructor
        super(scene, game.config.width, game.config.height - 2 * tileSize, 'obstacle'); 
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body
        this.setVelocityX(velocity);            // make it go!
        this.setImmovable();
        this.body.allowGravity = false;
        // this.tint = Math.random() * 0xFFFFFF;   // randomize tint
        this.newObstacle = true;                 // custom property to control obstacle spawning
        this.scene = scene;
        this.velocity = velocity;
    }

    update() {
        // override physics sprite update()
        super.update();

        if(this.scene.gameOver){
            this.setVelocityX(0);
        }

        // this.scene.time.addEvent({
        //     delay: Phaser.Math.Between(5000, 10000),
        //     callback: () =>{
        //         // console.log(this);
        //         // add new obstacle when existing barrier hits center X
        //         if(this.newObstacle && this.x < game.config.width / 2 &&  !this.scene.gameOver) {
        //             this.newObstacle = false;
        //             // call parent scene method from this context
        //             this.scene.spawnObstacle(this.parent, this.velocity);
        //         }
        //     },
        //     callbackScope: this.scene,
        //     loop: true
        // })


        // if(this.newObstacle && this.x < game.config.width / 2 &&  !this.scene.gameOver) {
        //     this.newObstacle = false;
        //     // call parent scene method from this context
        //     this.scene.spawnObstacle(this.parent, this.velocity);
        // }

        // destroy obstacle if it reaches the left edge of the screen
        if(this.x < -this.width) {
            this.destroy();
        }

        
    }
}