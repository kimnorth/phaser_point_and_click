let playerAvatar;
let playerTween;
let detectiveOffice;
let clickableArea;

let xActualClick;
let yActualClick;

let xMouseTarget;
let yMouseTarget;

let walkableArea = {
	minX: 115,
	maxX: 475,
	minY: 330,
	maxY: 395
};

let clickableObjects = [
	{ 
		name: 'computer',
	},
	{
		lookMessages: [
			"It's my trusty terminal.", 
			"I never could get the hang of these things."
		]
	},
	{
		name: 'doorway',
		coords: {

		},
		lookMessages: []
	}
]

var playState = {

    preload: function(){
        
    },
    
    create: function(){
    	detectiveOffice = game.add.sprite(0, 0, 'detectiveOffice');

    	playerAvatar = game.add.sprite(244, 330, 'player');
    	playerAvatar.anchor.set(0.5, 1)

    	detectiveOffice.inputEnabled = true;
    	detectiveOffice.events.onInputDown.add(movePlayer, this);

    	// clickableArea = game.add.sprite(542, 252, 'clickableArea');
    	// clickableArea.scale.setTo(0.5, 0.5);
    	// clickableArea.events.onInputDown.add(movePlayer, this);

    },
    
    update: function(){
        
        
    },
    
}

function movePlayer(i){

	console.log(i.input.downPoint.x)
	console.log(i.input.downPoint.y)
	yActualClick = i.input.downPoint.y;
	xActualClick = i.input.downPoint.x;

	// Remove any existing tweens so you don't get layered tweens on top of each other,
	// which was causing a weird defect with sprite jumping between both destinations
	if(playerTween != null){
		game.tweens.remove(playerTween)
	}

	// Create the new tween each time
	playerTween = game.add.tween(playerAvatar);

	// Check for out-of-bounds clicks

	if(i.input.downPoint.x < 115){
		xMouseTarget = 115;
	}
	else if(i.input.downPoint.x > 475){
		xMouseTarget = 475;
	}
	else {
		xMouseTarget = i.input.downPoint.x;
	}

	if(i.input.downPoint.y < 330){
		yMouseTarget = 330;
	}
	else if(i.input.downPoint.y > 395){
		yMouseTarget = 395;
	}
	else {
		yMouseTarget = i.input.downPoint.y;
	}

	const duration = (game.physics.arcade.distanceToXY(playerAvatar, xMouseTarget, yMouseTarget) / 250) * 1000;

	playerTween.to({x: xMouseTarget, y: yMouseTarget}, duration, Phaser.Easing.Linear.None, true)
	playerTween.onComplete.add(clickAction, this)
};

function clickAction(i){
	// move to item
	console.log('clicked');
	console.log(i);
	// check to see if
	console.log(xMouseTarget);
	console.log(yMouseTarget);

	console.log(playerAvatar)

	// This needs generalising - currently hardcoded to terminal

	if((xActualClick >= 540 && xActualClick <= 570) &&
		(yActualClick >= 250 && yActualClick <= 290)){
		console.log('within x and y of target')
		var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
		text = game.add.text(0, 0, "It's my trusty terminal.", style);
		// time event to remove it
	}
};


// for sprite - direction of animation will depend on whether x or y is greater value

// also - clickable objects needs to be done by sprites