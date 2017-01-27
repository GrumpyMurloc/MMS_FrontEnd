messages_generator.get_send_message_request = function(message){
	let request = {
		"content" : {
			"name" : "send_message",
			"encrypted" : "false",
			"message" : message
		},
	};
	console.log(message);
	return request;
}