var bootState = {
    
    bootUp: function(){
        
        console.log('Booting...');
        
        try {
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.state.start('load');
        }
        catch(err) {
            console.log(err.message);
        }
    },
    
    create: function(){
        this.bootUp();
    }
}