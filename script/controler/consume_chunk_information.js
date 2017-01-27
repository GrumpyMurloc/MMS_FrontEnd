controler.consume_chunk_information = function(message){
	let chunk = message.chunk;
	let left_x = chunk.left_x;
	let top_y = chunk.top_y;
	for (let i=0;i<chunk.lieux.length;i++){
		chunk.lieux[i].claimed = false;
		//console.log("Texture place");
		chunk.lieux[i].sprite = new Sprite(resources["./textures/ruin.png"].texture);
		chunk.lieux[i].sprite.width= 100;
		chunk.lieux[i].sprite.height= 150;
		chunk.lieux[i].sprite.anchor.set(0.4,0.8);
	}
	//console.log("received chunk information for ["+chunk.left_x+","+chunk.top_y+"]");
	for (let i=0;i<chunk_buffer.length;i++){
		for (let j=0;j<chunk_buffer[0].length;j++){
			let potential = chunk_buffer[i][j];
			if (potential.awaiting && potential.left_x == left_x && potential.top_y == top_y){
				chunk_buffer[i][j] = chunk;
				//console.log(chunk.tiles);
				chunk_buffer_fill++;
				return true;
			}
		}
	}
	//console.log("Couldn't find where to store the chunk in the buffer");
}