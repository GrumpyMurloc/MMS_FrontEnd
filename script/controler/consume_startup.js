controler.consume_startup= function(message){
	// this also quickstart pixi.js!
	let startup = message.player;
	player.username = startup.username;
	player.x   		= startup.x;
	player.y    	= startup.y;
	player.sprite = new Sprite(resources["./textures/Player.png"].texture);
	main_player_sprite = player.sprite;
	player_container.addChild(main_player_sprite);
	player.sprite.anchor.set(0.5, 0.5);
	player.sprite.width = 38;
	player.sprite.height = 50;
	// WHERE THE FUCK DOES THIS GO
	adjust_chunk_buffer(true);
	var map_load_interval = setInterval(function(){
		if (is_chunk_buffer_ready()){
			clearInterval(map_load_interval);
			map_load_interval = null;
			setup();
		}
	},100);
}