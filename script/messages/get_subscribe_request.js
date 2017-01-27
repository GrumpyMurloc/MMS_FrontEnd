messages_generator.get_subscribe_request = function(username,password){
	let request = {
		"content" : {
			"name" : "subscribe",
			"username" : username,
			"password" : password,
		},
	};
	return request;
}