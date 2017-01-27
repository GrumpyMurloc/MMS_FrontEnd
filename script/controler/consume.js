controler.consume = function(message){
	if 		(message.name == "chunk_information"){controler.consume_chunk_information(message);}
	else if (message.name == "place_info"){controler.consume_claim(message);}	
	else if (message.name == "login_fail"){controler.consume_login_fail(message);}
	else if (message.name == "startup"){controler.consume_startup(message);}
	else if (message.name == "inventory_update"){controler.consume_inventory_update(message);}
	else if (message.name == "chat_message"){controler.consume_chat_message(message);}
	else if (message.name == "other_player"){controler.consume_other_player(message);}
	else if (message.name == "bullet_fired"){controler.consume_bullet_fired(message);}
	else if (message.name == "event"){controler.consume_event(message);}
	else if (message.name == "subscribe_fail"){controler.consume_subscribe_fail(message);}
	else if (message.name == "subscribe_success"){controler.consume_subscribe_success(message);}
	else {/*console.log("unknown message from server:");console.log(message);*/}
}
