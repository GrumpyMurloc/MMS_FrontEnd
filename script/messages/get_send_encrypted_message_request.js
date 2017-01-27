messages_generator.get_send_encrypted_message_request = function(message){
	let cipher = crypto_wrapper.encrypt(message);
	let request = {
		"content" : {
			"name" : "send_message",
			"encrypted" : "true",
			"message" : cipher
		},
	};
	//console.log(cipher);
	return request;
}