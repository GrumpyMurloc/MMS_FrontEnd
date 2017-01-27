messages_generator.get_chunk_request = function(x,y){
	let request = {
		"content" : {
			"name" : "chunk_request",
			"left_x" : x,
			"top_y" : y,
		},
	};
	return request;
}