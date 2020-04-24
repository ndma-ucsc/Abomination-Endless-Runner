class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

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
        
        //start button
        let start = this.add.sprite(game.config.width/2, game.config.height/2 + 80, 'start').setInteractive({ pixelPerfect: true });
        start.on('pointerover', function () {
            this.setTint(0xff0000);
        });
        start.on('pointerout', function () {
            this.setTint();
        });
        start.on('pointerdown', function () {
            console.log('Start');
            start.setVisible(false);
            title.setVisible(false);
            game.scene.start("playScene");
        });
    }

    update(){

    }

}