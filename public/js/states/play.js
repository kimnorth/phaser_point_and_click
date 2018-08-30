let playerAvatar;
let playerTween;
let detectiveOffice;
let clickableArea;

let walkableArea = {
	minX: 115,
	maxX: 475,
	minY: 330,
	maxY: 395
};

let clickableObjects = [
	{ 
		name: 'computer',
		coords: {
			topLeftX: 542,
			topLeftY: 252,
			topRightY: 570,
			topRightY: 252,
			bottomLeftX: 536,
			bottomLeftY: 281,
			bottomRightX: 593,
			bottomRightY: 288,
		},
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

    	clickableArea = game.add.sprite(542, 252, 'clickableArea');
    	clickableArea.scale.setTo(0.5, 0.5);
    	clickableArea.events.onInputDown.add(playerClick, this);

    },
    
    update: function(){
        
        
    },
    
}

function movePlayer(i){
	// Remove any existing tweens so you don't get layered tweens on top of each other,
	// which was causing a weird defect with sprite jumping between both destinations
	if(playerTween != null){
		game.tweens.remove(playerTween)
	}

	// Create the new tween each time
	playerTween = game.add.tween(playerAvatar);
    let x = i.input.downPoint.x;
    let y = i.input.downPoint.y;
    coords = [];
    coords.push(x);
    coords.push(y);
    const movementTime = calculateVelocity(x, y);

    if((x >= walkableArea.minX && x<= walkableArea.maxX) && 
    	(y >= walkableArea.minY && y <= walkableArea.maxY)){
    		playerTween.to({x: x, y: y}, movementTime, Phaser.Easing.Linear.None, true);	
    }

    // The following controls what happens when player clicks outside the bounds of clickable
    // area. If that happens, it hardcodes the values to min or max values.

    // Else if x is less than min X coord, set x limit as minimum value for area

    else if ((x <= walkableArea.minX) && (y >= walkableArea.minY && y <= walkableArea.maxY))
    {
    	// if clicking outside the min/max range for that axis, 
    	// just go to the values in walkable area
    	x = walkableArea.minX;
    	playerTween.to({x: x, y: y}, movementTime, 'Linear', true);	
    }

    // Else if x is more than max X coord, set x limit as maximum value for area

    else if ((x >= walkableArea.maxX) && (y >= walkableArea.minY && y <= walkableArea.maxY))
    {
    	// if clicking outside the min/max range for that axis, 
    	// just go to the values in walkable area
    	x = walkableArea.maxX;
    	playerTween.to({x: x, y: y}, movementTime, 'Linear', true);	
    }

    // Else if y is less than min y coord, set y limit as minimum value for area

	else if ((y <= walkableArea.minY) && (x >= walkableArea.minX && x<= walkableArea.maxX))
    {
    	// if clicking outside the min/max range for that axis, 
    	// just go to the values in walkable area
    	y = walkableArea.minY;
    	playerTween.to({x: x, y: y}, movementTime, 'Linear', true);	
    }

    // Else if y is more than min y coord, set y limit as minimum value for area

	else if ((y <= walkableArea.maxY) && (x >= walkableArea.minX && x<= walkableArea.maxX))
    {
    	// if clicking outside the min/max range for that axis, 
    	// just go to the values in walkable area
    	y = walkableArea.maxY;
    	playerTween.to({x: x, y: y}, movementTime, 'Linear', true);	
    }

    // block any other tween action until this has run


    // if(playerTween.isRunning){
    // 	console.log("Running");
    // 	console.log(playerTween.isRunning);
    // }

    // console.log(playerTween)
    // playerTween.onComplete.add(test, this);

};

// function test(){
	
// }

function calculateVelocity(clickX, clickY){

	var distanceX = clickX - playerAvatar.position.x;
	var distanceY = clickY - playerAvatar.position.y;

	totalDistance = distanceX + distanceY;

	if(totalDistance < 0){
		totalDistance = totalDistance * -1;
	}

	console.log('Total Distance = ' + totalDistance)

	var desiredSpeed = 225;
	var time = totalDistance / desiredSpeed;

	time = time * 1000;
	if(time < 300){
		time = 400;
	}
	console.log('Time: ' + time + ' millisecs')
	return time;
};

function playerClick(i){
	// move to item

	movePlayer(i);

	// once tween is done, perform action on it
	console.log('x point:' + i.input.downPoint.x)
	console.log('y point:' + i.input.downPoint.y)

	console.log(i);

};


// for sprite - direction of animation will depend on whether x or y is greater value

// also - clickable objects needs to be done by sprites