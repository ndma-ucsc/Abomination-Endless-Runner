class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
        this.selected = 1;
    }

    create() {
        this.input.keyboard.enabled = false;
        this.cameras.main.fadeIn(2000);
        this.time.delayedCall(2000, () => {this.input.keyboard.enabled = true;});
        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        
        //title name
        this.title = this.add.text(game.config.width/2, game.config.height/4, 'Title', {
            fontFamily: 'Patricia',
            fontSize: '110px',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        let facadeConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#FACADE',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
        };

        // fox run
        this.anims.create({
            key: 'fox1_run',
            frames: this.anims.generateFrameNumbers('fox1', {start: 0, end: 3, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'fox2_run',
            frames: this.anims.generateFrameNumbers('fox2', {start: 0, end: 4, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'fox3_run',
            frames: this.anims.generateFrameNumbers('fox3', {start: 0, end: 7, first: 0}),
            frameRate: 10,
            repeat: -1
        });

        // fox jump
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('fox_jump', {start: 0, end: 13, first: 0}),
            frameRate: 10
        });

        // fox death
        this.anims.create({
            key: 'death',
            frames: this.anims.generateFrameNumbers('death', {start: 0, end: 9, first: 0}),
            frameRate: 10,
            repeat: 0
        });
        
        //start button
        this.start = this.add.sprite(game.config.width/2, game.config.height/2, 'start').setOrigin(0.5);
        this.option = this.add.sprite(game.config.width/2 + 70, game.config.height/2 + 100, 'start').setOrigin(0.5); //to be added
        this.credit = this.add.sprite(game.config.width/2 + 140, game.config.height/2 + 200, 'start').setOrigin(0.5); //to be added

        let facadeDebug = this.input.keyboard.createCombo(['f','a','c','a','d','e'], {
            resetOnWrongKey: true,
            maxKeyDelay: 0,
            resetOnMatch: true,
            deleteOnMatch: true,
        });
        this.input.keyboard.on('keycombomatch', (facadeDebug) => {
            collisionDebug = !collisionDebug;
            if (collisionDebug){
                this.add.tween({
                    targets: this.add.text(game.config.width/2, game.config.height/4 + 100, 'Collisions off!', facadeConfig).setOrigin(0.5),
                    alpha: {from: 1, to: 0},
                    duration: 3000,
                    ease: 'Linear'
                });
            }
            else if (!collisionDebug){
                this.add.tween({
                    targets: this.add.text(game.config.width/2, game.config.height/4 + 100, 'Collisions on!', facadeConfig).setOrigin(0.5),
                    alpha: {from: 1, to: 0},
                    duration: 3000,
                    ease: 'Linear'
                });
            }
        });
    }

    update(){
        if(this.input.keyboard.checkDown(cursors.up, 250)) {
            if(this.selected > 1) {
                this.selected--;
            }
            else {
                this.selected = 3;
            }
        }
        else if(this.input.keyboard.checkDown(cursors.down, 250)) {
            if(this.selected < 3) {
                this.selected++;
            }
            else {
                this.selected = 1;
            }
        }
        else if(this.selected == 1) {
            this.start.setTint(0xff0000);
            this.option.setTint();
            this.credit.setTint();
        }
        else if(this.selected == 2) {
            this.start.setTint();
            this.option.setTint(0xff0000);
            this.credit.setTint();
        }
        else if(this.selected == 3) {
            this.start.setTint();
            this.option.setTint();
            this.credit.setTint(0xff0000);
        }
        if(Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.input.keyboard.enabled = false;
            if(this.selected == 1) {
                this.cameras.main.fadeOut(1500);
                this.time.delayedCall(1500,() => {this.scene.start("playScene");});
            }
            if(this.selected == 2) {
                this.scene.start("optionScene");
            }
            if(this.selected == 3) {
                //to be added
            }
        }
    }
}