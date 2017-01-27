controler.consume_claim= function(message){
	let inventory = message.inventory 
	let discoverer = message.discoverer 
	let discovered_time = message.discovered_time 
	let place= getClosestPlace();
	place.claimed=true;
	place.inventory= inventory;
	place.discovered_by= discoverer;
	place.discovery_time= discovered_time;
	freezed= false;
	createPlaceMenu(place);
} 