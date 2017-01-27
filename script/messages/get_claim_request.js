messages_generator.get_claim_request = function(uid,x,y){
	let request = {
		"content" : {
			"name" : "claiming",
			"place_uid" : uid,
			"x" : x, 
			"y" : y
		},
	};
	return request;
}