pressed_keys = [];
function handle_key_pressed(){}
function setup_keyboard_commands(){
	var left		= keyboard(37),
		right		= keyboard(39),
		up			= keyboard(38),
		down		= keyboard(40),
		fullscreen	= keyboard(80),
		look		= keyboard(75),
		forward 	= keyboard(87),
		senestre 	= keyboard(65),
		backward 	= keyboard(83),
		space 		= keyboard(32),
		pause		= keyboard(27),
		shop 		= keyboard(69),
		dextre 		= keyboard(68);
		fullscreen.press= resizeAll;
	look.press=function(){
		//console.log(mouse_position);
		//console.log(player);
	}
	
	/* ----- WASD Movement ----- */
	handle_key_pressed = function(){
		if (!freezed){
			if (forward.isDown){player.movement("forward");}
			if (backward.isDown){player.movement("backward");}
			//if (senestre.isDown){player.movement("senestre");}
			//if (dextre.isDown){player.movement("dextre");}
			if (senestre.isDown){player.turn("left");}
			if (dextre.isDown){player.turn("right");}
			if (left.isDown){player.basic_movement("left");}
			if (up.isDown){player.basic_movement("up");}
			if (down.isDown){player.basic_movement("down");}
			if (right.isDown){player.basic_movement("right");}
			if (space.isDown){addBullet();}
		}	
	}
	pause.press= function(){
		freezed=!freezed;
		if(freezed)
			createPauseMenu();
		else{
			toggleCinematicMode(false);
			console.log("cinematic_mode_off");
		}
	}
	shop.press= function(){
		if (!writing){
			freezed=!freezed;
			let place= getClosestPlace()
			if(getProximite()){	
				if (freezed){
					createPlaceMenu(place);
				}
				else{
					$("#menu").empty();
					console.log("cinematic_mode_off");
					toggleCinematicMode(false);
				}
			}
			else{
				if (freezed){
					createInventory();
				}
				else{
					$("#menu").empty();
					toggleCinematicMode(false);
					console.log("cinematic_mode_off");

				}
			}

		}		
	}
}