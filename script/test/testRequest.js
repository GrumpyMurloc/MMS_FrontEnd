var testRequests= {};
testRequests.testShooting= function(){
	console.log("testShooting");
	msg = messages_generator.get_bullet_spawn_request(10,10,Math.PI/-2,1);
	msg_j = JSON.stringify(msg);
	websocket_io.send(msg_j);
}
testRequests.testClaim= function(){
	console.log("testClaim");
	msg = messages_generator.get_claim_request(12,12);
	msg_j = JSON.stringify(msg);
	websocket_io.send(msg_j);
}
testRequests.testLogin= function(){
	console.log("testLogin");
	msg = messages_generator.get_login_request("testing","testing");
	msg_j = JSON.stringify(msg);
	websocket_io.send(msg_j);
}
testRequests.testMoving= function(){
	console.log("testMoving");
	msg = messages_generator.get_moving_request(13,12,Math.PI/-2,1);
	msg_j = JSON.stringify(msg);
	websocket_io.send(msg_j);
}
testRequests.testEncrypt= function(){
	console.log("testEncrypt");
	msg = messages_generator.get_send_encrypted_message_request("Test de requete send message");
	msg_j = JSON.stringify(msg);
	websocket_io.send(msg_j);
}
testRequests.testMessage= function(){
	console.log("testMessage");
	msg = messages_generator.get_send_message_request("Test de requete send message");
	msg_j = JSON.stringify(msg);
	websocket_io.send(msg_j);
}
testRequests.testTransfert= function(){
	console.log("testTransfert");
	msg = messages_generator.get_transfert_request(from_uid,to_uid,item_uid);
	msg_j = JSON.stringify(msg);
	websocket_io.send(msg_j);
}
testRequests.testAll= function(){
	testRequests.testShooting();
	testRequests.testClaim();
	testRequests.testLogin();
	testRequests.testMoving();
	testRequests.testEncrypt();
	testRequests.testMessage();
	testRequests.testTransfert();
}
testRequests.testOtherPlayerLocal = function(){
	other = {
		"username" : "test_player",
		"x" : 20,
		"y" : 20,
		"angle" : 0.1,
		"speed" : 0.12
	}
	controler.consume_other_player(other);
}
testRequests.testBulletSpawnLocal = function(){
	bullet = {
		"x" : 5,
		"y" : -10,
		"angle" : 0.1,
		"speed" : 0.36
	}
	controler.consume_bullet_fired(bullet);
}
testRequests.check_if_inside = function(){
	for (let i=-2;i<3;i++){
		for (let j=-2;j<3;j++){
			let lx = i*64;
			let ty = j*64;
			chunk = {"left_x":lx,"top_y":ty};
			for (let x=-1;x<2;x++){
				for (let y=-1;y<2;y++){
					if (check_if_inside(chunk,x,y)){
						console.log("check_if_inside({"+lx+","+ty+"},"+x+","+y+"})");
					}
				}
			}
		}
	}
}
testRequests.print_chunk_buffer_coords = function(){
	for (let x=0;x<5;x++){
		for (let y=0;y<5;y++){
			console.log(x+","+y+" : "+chunk_buffer[x][y].left_x+","+chunk_buffer[x][y].top_y);
		}
	}
}