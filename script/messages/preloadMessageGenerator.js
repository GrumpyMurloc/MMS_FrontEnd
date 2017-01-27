// needed global variable for websocket various message sending
messages_generator = {};
quickLoad("./script/messages/get_bullet_spawn_request.js"			);
quickLoad("./script/messages/get_chunk_request.js"				  	);
quickLoad("./script/messages/get_claim_request.js"				  	);
quickLoad("./script/messages/get_login_request.js"				  	);
quickLoad("./script/messages/get_moving_request.js"				  	);
quickLoad("./script/messages/get_send_encrypted_message_request.js" );
quickLoad("./script/messages/get_send_message_request.js"			);
quickLoad("./script/messages/get_transfert_request.js"			  	);
quickLoad("./script/messages/get_subscribe_request.js"			  	);

