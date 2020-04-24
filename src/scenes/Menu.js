class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();
        
    }

    update(){        
        this.scene.start("playScene");
    }
}