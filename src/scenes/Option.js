class Menu extends Phaser.Scene {
    constructor() {
        super("optionScene");
    }

    create() {


    }

    update(){

        this.scene.start("menuScene");

    }

}