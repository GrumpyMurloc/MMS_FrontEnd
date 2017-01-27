controler.consume_inventory_update = function(message){
	if (typeof player != 'undefined') {
		if (player != null){
			player.setInventory(message.new_inventory);
			freezed= false; 
			//console.log(message);
			//console.log("received inventory update");
		}
	}
	else {
		var startupInventory = message.new_inventory;
	}
}