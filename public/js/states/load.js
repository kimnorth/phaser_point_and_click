var loadState = {
    
    preload: function(){
        
        try {
            console.log('Loading assets.');
            
            game.load.image('detectiveOffice', '../assets/valentine-office.png');
            game.load.image('player', '../assets/temp-player.png');
            game.load.image('clickableArea', '../assets/clickable.png');

            console.log('Assets loaded.');
        }
        catch(err){
            console.log(err);
        }
        
    },
    
    create: function(){
        game.state.start('menu')
    }
    
}