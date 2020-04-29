class Option extends Phaser.Scene {
    constructor() {
        super("optionScene");
    }

    create() {
        
        this.add.text(0,0,'sup').setOrigin(0);
        console.log('here');
        this.scene.start("menuScene"); 
        

    }

    update(){
    }

}