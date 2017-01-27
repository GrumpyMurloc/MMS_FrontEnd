messages_generator.get_login_request = function(username,password){
	let request = {
		"content" : {
			"name" : "startup",
			"username" : username,
			"password" : password,
		},
	};
	//console.log("login");
	return request;
}