class Option extends Phaser.Scene {
    constructor() {
        super("optionScene");
    }

    create() {
        this.cameras.main.fadeIn(1500);
        this.volume_array = [0.0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1];

        let optionTextConfig = {
            fontFamily: 'Bradley Hand',
            fontSize: '50px',
            color: '#0D7DB0',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
        };

        this.add.text(game.config.width/5, game.config.height/3, 'Volume', optionTextConfig).setOrigin(0,0.5);
        this.add.text(game.config.width/5, 2*game.config.height/3, 'Fullscreen', optionTextConfig).setOrigin(0,0.5);

        cursors = this.input.keyboard.createCursorKeys();
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update(){
        if(this.input.keyboard.checkDown(cursors.up, 250)) {
            if(this.selected > 1) {
                this.selected--;
            }
            else {
                this.selected = 2;
            }
        }
        else if(this.input.keyboard.checkDown(cursors.down, 250)){
            if(this.selected < 2) {
                this.selected++;
            }
            else {
                this.selected = 1;
            }
        }
        else if(this.selected == 1) {
            this.restartText.setTint(0x1081e0).setScale(1.2);
            this.returnMenuText.setTint().setScale();
        }
        else if(this.selected == 2) {
            this.restartText.setTint().setScale();
            this.returnMenuText.setTint(0x1081e0).setScale(1.2);
        }

        if(Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.input.keyboard.enabled = false;
            switch(this.selected){
                case 1:{

                }

            }
        }





        // if(Phaser.Input.Keyboard.JustDown(keyENTER)) {
        //     this.scene.setVisible(true, "menuScene");
        //     this.add.tween({
        //         targets: this.cameras.main,
        //         alpha: 0,
        //         ease: 'Linear',
        //         duration: 500
        //     });
        //     this.time.delayedCall(500,() => {
        //         this.scene.stop("optionScene");
        //     });
        // }

    }

}