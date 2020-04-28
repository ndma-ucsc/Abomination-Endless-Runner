class Opening extends Phaser.Scene {
    constructor() {
        super("openScene");
    }

    create() {
        bgMusic = this.sound.add('menu_ost', {volume: bg_volume, loop: true});
        bgMusic.play();
        cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown', () => {this.scene.start("menuScene");});
        this.sound.pauseOnBlur = false
        let openConfig = {
            fontFamily: 'Arial',
            fontSize: '100px',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
        };
        
        this.AbominationText = this.add.text(game.config.width/2, game.config.height/2, "Abominations", openConfig).setOrigin(0.5);
        this.AbominationText.alpha = 0;

        this.byText = this.add.text(game.config.width/2, game.config.height/3 + 70, "By\nVictor Chung\nNathan Ma\nSam Nguyen", openConfig).setOrigin(0.5);
        this.byText.alpha = 0;

        this.seycaraText = this.add.text(game.config.width/2, game.config.height/2, "Special Thanks to \nSeycara Orchestra", openConfig).setOrigin(0.5);
        this.seycaraText.alpha = 0;

        this.add.tween({
            targets: this.AbominationText,
            alpha: {from: 0, to: 1},
            ease: 'Linear',
            duration: 20,
            delay: 800
        });
        this.add.tween({
            targets: this.AbominationText,
            alpha: {from: 1, to: 0},
            ease: 'Linear',
            duration: 500,
            delay: 1550
        });

        this.add.tween({
            targets: this.byText,
            alpha: {from: 0, to: 1},
            ease: 'Linear',
            duration: 20,
            delay: 2300
        });
        this.add.tween({
            targets: this.byText,
            alpha: {from: 1, to: 0},
            ease: 'Linear',
            duration: 500,
            delay: 3050
        });

        this.add.tween({
            targets: this.seycaraText,
            alpha: {from: 0, to: 1},
            ease: 'Linear',
            duration: 20,
            delay: 3800
        });
        this.add.tween({
            targets: this.seycaraText,
            alpha: {from: 1, to: 0},
            ease: 'Linear',
            duration: 500,
            delay: 4550
        });

        this.time.delayedCall(5050, () => {this.scene.start("menuScene");});

    }
}