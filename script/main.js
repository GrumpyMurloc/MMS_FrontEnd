function socket_setup(){
	websocket_io.start(function(){
		createHome(function(){}); // on crée le login
		// on affiche le login ?
	});
}
function setup() {
	$("#menu").css("padding-top","20px"); // override default 250px of login screen	
	setup_keyboard_commands();
	setup_click_handler();
    console.log("Finishing setup...");
	setup_done = true; // Important
	resizeAll();
	doInitialRender();
	ourGameLoop();
}

function ourGameLoop(){
	setTimeout(function(){
		fps_buffer -=1;
		if (fps_buffer <= 0){
			fps_buffer = 10;
			let fps = 10000/(Date.now()-now);
			fps_display.setText(""+parseInt(fps)+" FPS");
			now = Date.now();
		}
		let wait_time = 1;
		// Need to adjust this accordingly to elapsed time so that we do not exceed 60 fps.
		setTimeout(ourGameLoop,1);
		state(); // game logic
		renderer.render(stage);
		//getProximite();

	},1);
}
function state(){
	// Game Logic!
	player.moved = false;
	player.turned = false;
	player.tick();
	moveBullets();
	moveOtherPlayers();
	handle_key_pressed();
	player.execute_movement();
	// Rendering
	if (player.moved){
		map_container.cacheAsBitmap = false;
		renderMap();
	}
	else{
		map_container.cacheAsBitmap = true;
	}
	renderPlayer();
	renderOtherPlayers();
	renderBullets();
	renderLieux();
	createClaim();
	createChat();
}
//The `randomInt` helper function
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
socket_setup();