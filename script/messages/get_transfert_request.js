messages_generator.get_item_transfert_request = function(item_uids,to_uid,toward_type){
	let request = {
		"content" : {
			"name" : "item_transfer",
			"item_uids" : item_uids,
			"toward" : to_uid,
			"toward_type" : toward_type
		},
	};
	return request;
}