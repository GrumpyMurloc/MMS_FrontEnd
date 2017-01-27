messages_generator.get_moving_request = function(x,y,angle,dx,dy){
	let request = {
		"content" : {
			"name" : "moving",
			"x" : x,
			"y" : y,
			"angle" : angle,
			"dx": dx,
			"dy": dy
		},
	};
	return request;
}
messages_generator.auto_send_moving_request = function(ignore_throttle=false){
	let minimum_time = 1000/10;// milliseconds (maximum 10 per seconds)
	let n = new Date().getTime();
	let timedelta = n - player.last_moving_request;
	if (ignore_throttle || timedelta > minimum_time){
		//console.log("Moving");
		let msg = messages_generator.get_moving_request(player.x,player.y,player.angle,player.dx,player.dy)
		msg = JSON.stringify(msg);
		websocket_io.send(msg);
		player.last_request_was_stop = false;
		player.last_moving_request = n;
	}
}

messages_generator.auto_send_stopped_request = function(force=false){
	if (!force && player.last_request_was_stop){return;} //useless noise
	let msg = messages_generator.get_moving_request(player.x,player.y,player.angle,0,0);
	msg = JSON.stringify(msg);
	websocket_io.send(msg);
	player.last_request_was_stop = true;
}