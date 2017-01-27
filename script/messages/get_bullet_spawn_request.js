messages_generator.get_bullet_spawn_request = function(x,y,angle,speed){
	let request = {
		"content" : {
			"name" : "shooting",
			"x" : x,
			"y" : y,
			"angle" : angle,
			"speed" : speed
		}
	};
	return request;
}