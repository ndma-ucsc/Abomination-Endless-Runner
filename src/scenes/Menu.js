class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
        this.selected = 1;
    }

    create() {
        switching = false;
        this.cameras.main.fadeIn(2000);
        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        
        //title name
        let title = this.add.text(game.config.width/2-124, game.config.height/2-100, 'Title', {
            fontFamily: 'Patricia',
            fontSize: '110px',
            color: '#FFFFFF'

        });

        // fox run
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('fox', {start: 0, end: 3, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'run2',
            frames: this.anims.generateFrameNumbers('fox_run', {start: 0, end: 7, first: 0}),
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
        this.start = this.add.sprite(game.config.width/2, game.config.height/2 + 80, 'start');
        this.option = this.add.sprite(game.config.width/2, game.config.height/2 + 180, 'start'); //to be added
        this.credit = this.add.sprite(game.config.width/2, game.config.height/2 + 280, 'start'); //to be added
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
            this.cameras.main.fadeOut(1500);
            this.time.delayedCall(1500,() => {
                if(this.selected == 1) {
                    this.scene.start("playScene");
                }
                if(this.selected == 2) {
                    //to be added
                }
                if(this.selected == 3) {
                    //to be added
                }
            });
        }
    }

}