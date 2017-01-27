function getEmptyPlayer(){
	let inventory = []
	if (typeof startupInventory != 'undefined') {
		if (startupInventory != null){
			inventory = startupInventory;
			startupInventory = null;
		}
	}
	return {
		"username":"Not_Initialized_Player",
		"x":0,
		"y":0,
		"dx":0.0,
		"dy":0.0,
		"angle":Math.PI/-2,
		"moved":false,
		"turned":false,
		"max_speed":0.05,//0.10,
		"time_to_shoot":0,
		"last_shooting_time":5,
		"send_time":5,
		"current_chunk":null,
		"last_chunk":null,
		"inventory":inventory,
		"last_moving_request":new Date().getTime(),
		"last_request_was_stop":true
	}
}
function createOtherPlayer(message){
	let other = getEmptyPlayer();
	other.username	= message.username;
	other.x 		= message.x;
	other.y 		= message.y;
	other.angle 	= message.angle;
	other.speed 	= message.speed;
	return other;
}
function appendMethodsToPlayer(player){
	player.setInventory = function(inventory){
		player.inventory=inventory;
	}
	player.setXY = function(x,y){
		player.x=x;
		player.y=y;
		player.moved=true;
	} // debug (or teleport) method
	player.tick = function(){
		if (player.time_to_shoot>0){
			player.time_to_shoot-=1;
		}
	}
	//console.log(chunk_buffer[4].name);
	player.turn = function(direction){
		if (direction=="right"){
			player.angle += Math.PI/64;
		}
		else if (direction=='left'){
			player.angle -= Math.PI/64;
		}
		// keeping the angle between -PI and PI
		if (player.angle > Math.PI){player.angle-=2*Math.PI;}
		else if (player.angle < -Math.PI){player.angle+=2*Math.PI;}
		//limiting rounding errors from time to time
		if (Math.abs(player.angle-0) < 0.025){player.angle =0;}
		player.turned = true;
	}
	player.after_movement = function(){
		player.current_chunk = get_containing_chunk(player.x, player.y);
		if (player.current_chunk == undefined){player.current_chunk = get_containing_chunk(player.x, player.y,true);}
		if (player.last_chunk == null){player.last_chunk = player.current_chunk;}
		if (player.current_chunk != player.last_chunk){adjust_chunk_buffer();}
		player.last_chunk = player.current_chunk;
	}
	player.movement = function(direction){
		player.moved = true;
		messages_generator.auto_send_moving_request();
		let max_speed = player.max_speed;
		let offset;
		if 		(direction == "forward") { offset =  0;			}
		else if (direction == "backward"){ offset =  Math.PI;	}
		else if (direction == "senestre"){ offset = -Math.PI/2;	}
		else if (direction == "dextre")	 { offset =  Math.PI/2;	}
		else { offset = 0; }
		dx = Math.cos(player.angle+offset);
		dy = Math.sin(player.angle+offset);
		player.dx += dx;
		player.dy += dy;
		// Limiting max speed
		speed = Math.sqrt(Math.pow(player.dx,2)+Math.pow(player.dy,2));
		if (speed > max_speed){
			player.dx = player.dx * max_speed/speed;
			player.dy = player.dy * max_speed/speed;
		}
		player.after_movement();
	}
	player.execute_movement = function(){
		// applying inertia to position
		let x = player.x; //backup
		let y = player.y;
		if (!player.moved){
			let inertia_factor = 0.8;
			player.dx *= inertia_factor;
			player.dy *= inertia_factor;
			if (Math.abs(player.dx)<0.01){player.dx=0.0;}
			if (Math.abs(player.dy)<0.01){player.dy=0.0;}
		}
		if (player.dx==0 && player.dy == 0){messages_generator.auto_send_stopped_request();}
		player.x += player.dx;
		player.y += player.dy;
		player.moved=(x != player.x || y != player.y)
		player.after_movement();
	}
	/* ----- Basic Arrow Movement ---- */
	player.basic_movement= function(direction){
		/*player.moved = true;
		let speed = 0.0;
		let max_speed = 0.5;
		if 		(direction == "left") { player.dx +=  -0.5;}
		else if (direction == "up")	  { player.dy +=  -0.5;}
		else if (direction == "right"){ player.dx +=  0.5;}
		else if (direction == "down") { player.dy +=  0.5;}
		// Limiting max speed
		speed = Math.sqrt(Math.pow(player.dx,2)+Math.pow(player.dy,2));
		if (speed > max_speed){
			player.dx = player.dx * max_speed/speed;
			player.dy = player.dy * max_speed/speed;
		}
		player.after_movement();*/
	}
}
function appendMethodsToOthers(other){
	other.move = function(){
		other.x+=other.dx;
		other.y+=other.dy;
		if (other.getDistance()>128){
			other.sprite.destroy();
			invalid_other_players.push(other);
		}
	}
	other.getDistance = function(){
		return Math.round(Math.sqrt(Math.pow((player.x-other.x),2)+Math.pow((player.y-other.y),2)));
	}
}
function moveOtherPlayers(){
	for (i=0; i<other_players.length; i++){other_players[i].move();}
	while (invalid_other_players.length>0){
		let bad_boy = invalid_other_players.pop();
		//console.log("destroying");
		other_players.splice(other_players.indexOf(bad_boy),1);
	}
}
var player = getEmptyPlayer();
appendMethodsToPlayer(player);