controler.consume_other_player = function(message){
	//console.log(message);
	let other = createOtherPlayer(message);
	other.dx = +message.dx.toFixed(4);
	other.dy = +message.dy.toFixed(4);
	appendMethodsToOthers(other);
	let found = false;
	for (i=0;i<other_players.length;i++){
		if (other_players[i].username === other.username){
			SwapInfoLeft(other_players[i],other);
			found = true;
		}
	}
	if (!found){
		other.sprite = new Sprite(resources["./textures/triangle.png"].texture);
		other.sprite.anchor.set(0.5, 0.5);
		other.sprite.width = 50;
		other.sprite.height = 50;
		other_players.push(other);
		other_player_container.addChild(other.sprite);
	}
}
function SwapInfoLeft(a,b){
	a.username = b.username;
	a.x = b.x;
	a.y = b.y;
	a.dx = b.dx;
	a.dy = b.dy;
	a.angle = b.angle;
	a.speed = b.speed;
}