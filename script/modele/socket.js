var ws = null;
/*ws = new WebSocket("ws://96.127.239.115:8766");*/
var websocket_io = {}; // just packaging our methods
websocket_io.start = function(callback=null){
	if (ws!=null){
		if (ws.readyState==1)
			console.log("Websocket already opened");
		return false;
	}
	ws = new WebSocket("ws://192.222.204.81:80");
	ws.onopen = function(){
		console.log("Opened connection");
		if (callback){
			callback();
		}
	};
	ws.onmessage = function (evt) {
		var received_msg = evt.data;
		//console.log(received_msg);
		let message = JSON.parse(received_msg);
		controler.consume(message);
		return false; //needed?
	};
	ws.onclose = function(){ 
		/* websocket is closed. */
		console.log("Closed connection");
		ws = null;
	};
}
websocket_io.send = function(message="default message"){
	// Anti javaScript injection
	message = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
	if (ws.readyState ==1){
		//console.log(message);
		ws.send(message);
	}
	else{
		console.log("not on readyState 1");
	}
	return false;
}
websocket_io.close = function(){
	if (ws!=null) ws.close();
	/* console.log(ws.readyState);*/
	ws= null;
	/* console.log(ws);*/
}
websocket_io.tryChunkRequest = function(){
		let request = {
			"version" : "0.1",
			"content" : {
				"name" : "chunk_request",
				"left_x" : 0,
				"top_y" : 0,
			},
		}
		message = JSON.stringify(request);
		websocket_io.send(message);
}