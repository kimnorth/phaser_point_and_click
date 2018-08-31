let state = {preload: preload, create: create, update: update}

let sceneDetails = {
	playerStartPoints = [{label: 'exit1', x: 0, y: 0},{label: 'exit2', x: 0, y: 0}],
	clickableObjects = [{}, {}]
}

function preload(){
	game.load.image('clickableArea', '../assets/clickable.png');
}
function create(){}
function update(){}