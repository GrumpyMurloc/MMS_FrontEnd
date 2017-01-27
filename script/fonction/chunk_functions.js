var chunk_buffer = [
[null,null,null,null,null],
[null,null,null,null,null],
[null,null,null,null,null],
[null,null,null,null,null],
[null,null,null,null,null]];
var chunk_buffer_size = 25;
var chunk_buffer_fill = 0;
 // using a 5x5 buffer.

function is_chunk_buffer_ready(){
	for (let i=0;i<chunk_buffer.length;i++){
		for (let j=0;j<chunk_buffer[i].length;j++){
			if (chunk_buffer[i][j].awaiting){return false;}
		}
	}
	return true;
}
function check_if_inside(chunk, x,y){
	let cx = Math.ceil(x);
	let cy = Math.ceil(y);
	let fx = Math.floor(x);
	let fy = Math.floor(y);
	if (   cx < chunk.left_x 
		|| fx > chunk.left_x+63 
		|| cy < chunk.top_y 
		|| fy > chunk.top_y+63)
		return false;
	return true;
}
function get_containing_chunk(x,y,verbose=false){ 
	for (let i = 0; i<chunk_buffer.length; i++){
		for (let j=0; j<chunk_buffer[i].length; j++){
			if (check_if_inside(chunk_buffer[i][j],x,y)){
				return chunk_buffer[i][j];
			}
		}
	}
}
function create_proto_chunk(x,y){
	return {
		"left_x":x,
		"top_y":y,
		"awaiting":true,
		"tiles":[],
		"lieux":[],
	}
}
function log_chunk_buffer_content(){
	//console.log("Chunk buffer current state");
	for (let i = 0; i<chunk_buffer.length; i++){
		//console.log(i+":");
		for (let j=0; j<chunk_buffer[i].length; j++){
			//console.log("\t"+chunk_buffer[i][j].left_x+","+chunk_buffer[i][j].top_y);
		}
	}
} 
function getRelativeFromAbsolute(chunk,x,y){
	return (x-chunk.left_x)*64+(y-chunk.top_y);
}

function do_initial_chunk_buffer_adjust(){
	//map_container.removeChildren();
	lieu_container.removeChildren();
	// inital loading
	let middle_left_x = player.x - (player.x % 64);
	let middle_top_y = player.y - (player.y % 64);
	if (player.x % 64 != 0 && player.x<0){middle_left_x -= 64;}
	if (player.y % 64 != 0 && player.y<0){middle_top_y  -= 64;}
	//console.log("do_initial_chunk_buffer_adjust here! Notice me senpai!")
	//console.log("... I found that the middle chunk should be: ("+middle_left_x+","+middle_top_y+")");
	//console.log("... Player position is: ("+player.x+","+player.y+")");
	let message = "";
	for (let i=-2;i<3;i++){
		for (let j=-2;j<3;j++){
			let x = middle_left_x + i*64;
			let y = middle_top_y + j*64;
			message = messages_generator.get_chunk_request(x,y);
			message = JSON.stringify(message);
			websocket_io.send(message);
			chunk_buffer[j+2][i+2] = create_proto_chunk(x,y)
		}
	}
}
function adjust_chunk_buffer(initial=false){
	if (initial){
		do_initial_chunk_buffer_adjust();
	}
	else {
		let middle_chunk = player.current_chunk;
		let last_middle = player.last_chunk;
		let dx = middle_chunk.left_x - last_middle.left_x;
		let dy = middle_chunk.top_y - last_middle.top_y;
		if(dx || dy){
			// We be in no hurry here, we can do this when the browser has time
			whenHasTime(function(){async_adjust(middle_chunk,dx,dy);});
		}
	}
}
function async_adjust(middle_chunk,dx,dy){
	let left_x = 0;
	let top_y = 0;
	let i = 0;
	let j = 0;
	let message = null;
	if (dx>0){
		//everything is moved LEFT
		for (i=0;i<5;i++){
			for (j=0;j<4;j++){
				chunk_buffer[i][j] = chunk_buffer[i][j+1]; 
			}
			left_x = middle_chunk.left_x + 2*64;
			top_y = middle_chunk.top_y + (i-2)*64;
			chunk_buffer[i][4] = create_proto_chunk(left_x,top_y);
			let message = messages_generator.get_chunk_request(left_x,top_y);
			message = JSON.stringify(message);
			websocket_io.send(message);
		}
	}
	else if (dx<0){
		//everything is moved RIGHT
		for (let i=0;i<5;i++){
			for (let j=4;j>0;j--){
				chunk_buffer[i][j] = chunk_buffer[i][j-1];
			}
			let left_x = middle_chunk.left_x-2*64;
			let top_y = middle_chunk.top_y+(i-2)*64;
			chunk_buffer[i][0] = create_proto_chunk(left_x,top_y);
			let message = messages_generator.get_chunk_request(left_x,top_y);
			message = JSON.stringify(message);
			websocket_io.send(message);
		}
	}
	if (dy>0){
		// everything is moved UP
		//console.log("dy>0");
		for (i=0;i<5;i++){
			for (j=0;j<4;j++){
				chunk_buffer[j][i] = chunk_buffer[j+1][i];
			}
			left_x = middle_chunk.left_x+(i-2)*64;
			top_y = middle_chunk.top_y+2*64;
			chunk_buffer[4][i] = create_proto_chunk(left_x,top_y);
			message = messages_generator.get_chunk_request(left_x,top_y);
			message = JSON.stringify(message);
			websocket_io.send(message);
		}

	}
	else if (dy<0){
		// everything is moved DOWN
		//console.log("dy<0");
		for (i=0;i<5;i++){
			for(j=4;j>0;j--){
				chunk_buffer[j][i] = chunk_buffer[j-1][i]; 
			}
			left_x = middle_chunk.left_x+(i-2)*64;
			top_y = middle_chunk.top_y-2*64;
			chunk_buffer[0][i] = create_proto_chunk(left_x,top_y);
			message = messages_generator.get_chunk_request(left_x,top_y);
			message = JSON.stringify(message);
			websocket_io.send(message);
		}
	}
	//console.log("after");
	log_chunk_buffer_content();
}



function async_adjust_clever(middle_chunk,last_middle,dx,dy){
	//console.log("before");
	//log_chunk_buffer_content();
	if (dx>0){
		//everything is moved LEFT
		for (let i=0;i<5;i++){
			for (let j=0;j<4;j++){
				chunk_buffer[i][j] = chunk_buffer[i][j+1];
			}
			let left_x = middle_chunk.left_x+2*64;
			let top_y = middle_chunk.top_y+(i-2)*64;
			chunk_buffer[i][4] = create_proto_chunk(left_x,top_y);
			let message = messages_generator.get_chunk_request(left_x,top_y);
			message = JSON.stringify(message);
			websocket_io.send(message);
		}
	}
	else if (dx<0){
		//everything is moved RIGHT
		for (let i=0;i<5;i++){
			for (let j=4;j>0;j--){
				chunk_buffer[i][j] = chunk_buffer[i][j-1];
			}
			let left_x = middle_chunk.left_x-2*64;
			let top_y = middle_chunk.top_y+(i-2)*64;
			chunk_buffer[i][0] = create_proto_chunk(left_x,top_y);
			let message = messages_generator.get_chunk_request(left_x,top_y);
			message = JSON.stringify(message);
			websocket_io.send(message);
		}
	}
	if (dy>0){ // gamebreaking freeze
		// everything is moved UP
		//console.log("dy>0");
		for (let i=0;i<4;i++){ 
			for (let j=0;j<5;j++){
				chunk_buffer[i][j] = chunk_buffer[i+1][j]; 
			}
			let left_x = middle_chunk.left_x+(i-2)*64;
			let top_y = middle_chunk.top_y+2*64;
			chunk_buffer[4][i] = create_proto_chunk(left_x,top_y);
			let message = messages_generator.get_chunk_request(left_x,top_y);
			message = JSON.stringify(message);
			websocket_io.send(message);
		}

	}
	else if (dy<0){ // gamebreaking freeze
		// everything is moved DOWN
		//console.log("dy<0");
		for (let i=4;i>0;i--){
			for (let j=0;j<5;j++){
				chunk_buffer[i][j] = chunk_buffer[i-1][j]; 
			}
			let left_x = middle_chunk.left_x+(i-2)*64;
			let top_y = middle_chunk.top_y-2*64;
			chunk_buffer[0][i] = create_proto_chunk(left_x,top_y);
			let message = messages_generator.get_chunk_request(left_x,top_y);
			message = JSON.stringify(message);
			websocket_io.send(message);
		}
	}
	//console.log("after");
	log_chunk_buffer_content();
}
