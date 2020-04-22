// Fox/Player prefab
class Fox extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);   // add object to existing, displayList, updateList
    }
    
    update() {
        
    }

    reset(){
        
    }
}