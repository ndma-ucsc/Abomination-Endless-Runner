class Option extends Phaser.Scene {
    constructor() {
        super("optionScene");
    }

    create() {
        this.cameras.main.fadeIn(1500);
        this.add.image(game.config.width/2, game.config.height/2, 'fox1_bg').setOrigin(0.5);
        this.add.text(game.config.width/2,game.config.height/2,'sup').setOrigin(0);
        console.log('here');
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.scene.setVisible(true, "menuScene");
            this.add.tween({
                targets: this.cameras.main,
                alpha: 0,
                ease: 'Linear',
                duration: 500
            });
            this.time.delayedCall(500,() => {
                this.scene.stop("optionScene");
            });
        }

    }

}