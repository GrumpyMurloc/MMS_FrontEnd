// Classe qui capture les évènements du clavier
function keyboard(keyCode) {
	var key = {};
	key.code = keyCode;
	key.isDown = false;
	key.isUp = true;
	key.press = undefined;
	key.release = undefined;
	//The `downHandler`
	key.downHandler = function(event) {
		//console.log(event.keyCode);
		if (event.keyCode === key.code) {
			if (key.isUp && key.press) key.press();
			key.isDown = true;
			key.isUp = false;
		}
		if (event.keyCode == 18){
			event.preventDefault();
		}
	};

	//The `upHandler`
	key.upHandler = function(event) {
		if (event.keyCode === key.code) {
			if (key.isDown && key.release) key.release();
			key.isDown = false;
			key.isUp = true;
		}
		if (event.keyCode == 18){
			event.preventDefault();
		}
	};

	//Attach event listeners
	window.addEventListener(
		"keydown", key.downHandler.bind(key), false
		);
	window.addEventListener(
		"keyup", key.upHandler.bind(key), false
		);
	return key;
}