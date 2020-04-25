class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload(){

        this.load.path = "./assets/";
        this.load.image('start', 'start.png');
        this.load.spritesheet('fox', 'base_fox.png', {frameWidth: 148, framHeight: 96, startFrame: 0, endFrame: 3});
        this.load.spritesheet('foxy', 'foxy.png', {frameWidth: 148, framHeight: 196, startFrame: 0, endFrame: 3});
        this.load.image('talltrees', 'talltrees.png');
        // this.load.audio('death', '');
        this.load.audio('bgMusic', 'audio/Warm_Light.mp3');
        this.load.audio('obstacle', 'obstacle.png');
        this.load.audio('jump_sfx', 'audio/jump_sfx.wav');

        this.load.spritesheet('death', 'fship_explosion.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 9}); // dummy

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
        bgMusic = this.sound.add('bgMusic', {volume: 0.15, loop: true});
        bgMusic.play();
        this.scene.start("menuScene");
    }

    update(){        
        
    }
}