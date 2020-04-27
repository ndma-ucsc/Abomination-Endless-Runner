class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload(){
        this.load.path = "./assets/";

        this.load.image('start', 'start.png');
        this.load.image('talltrees', 'talltrees.png'); // dummy
        this.load.image('obstacle', 'obstacle.png');
        this.load.image('tile_block', 'ForestTile.png');

        // these need to be atlas later
        this.load.spritesheet('fox1', 'base_fox.png', {frameWidth: 128, frameHeight: 87, startFrame: 0, endFrame: 3});
        this.load.spritesheet('fox2', 'base_fox2.png', {frameWidth: 148, frameHeight: 96, startFrame: 0, endFrame: 4});
        this.load.spritesheet('fox3', 'blue_fox.png', {frameWidth: 189, frameHeight: 96, startFrame: 0, endFrame: 7});
        this.load.spritesheet('death', 'fship_explosion.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 9}); // dummy

        this.load.audio('jump_sfx', 'sfx/jump_sfx.wav');

        this.load.audio('fox1_bgm', 'ost/Dreams_of_the_Brilliant.mp3');
        this.load.audio('fox2_bgm', 'ost/The_Long_Journey.mp3');
        this.load.audio('fox3_bgm', 'ost/Water_Spirit.mp3');
        this.load.audio('fox4_bgm', 'ost/Wind_Spirit.mp3');
        this.load.audio('fox5_bgm', 'ost/Earth_Spirit.mp3');
        this.load.audio('fox6_bgm', 'ost/.mp3');
        this.load.audio('fox7_bgm', 'ost/.mp3');
        this.load.audio('fox8_bgm', 'ost/.mp3');
        this.load.audio('fox9_bgm', 'ost/.mp3');
        this.load.audio('death_bgm','ost/Autumn_Rain.mp3')
        

        /* test loading bar buffer*/
        // this.load.image('background', 'images/tut/background.png');
        // for(var i =0;i<30;i++) {
		// 	this.load.image('background_'+i, 'images/tut/background.png');
		// };

        // loading bar frame
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(game.config.width / 4, game.config.height / 2, game.config.width / 2, 50);
        
        // loading... text
        var loadingText = this.make.text({
            x: game.config.width / 2 + 5,
            y: game.config.height / 2 - 30,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        // loading percent text
        var percentText = this.make.text({
            x: game.config.width / 2,
            y: game.config.height / 2 + 70,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        // loader
        this.load.on('progress', function (value) {
            // console.log(value);
            percentText.setText(parseInt(value * 100) + '%');
            
            // active loading bar
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(game.config.width/4 + 10, game.config.height/2 + 10, (game.config.width / 2 - 20) * value, 30);
        });

        // load tracking
        this.load.on('fileprogress', function (file) {
            console.log(file.src);
        });
        
        // destroy loading bar
        this.load.on('complete', function () {
            console.log('complete');
            progressBar.destroy();
            progressBox.destroy();	
            loadingText.destroy();
            percentText.destroy();
        });
    }

    create() {
        this.cameras.main.fadeOut(1000);
        bgMusic = this.sound.add('fox1_bgm', {volume: 0.3, loop: true});
        bgMusic.play();
        this.time.delayedCall(1000, () => {this.scene.start("menuScene");})
    }

    update(){        
        
    }
}