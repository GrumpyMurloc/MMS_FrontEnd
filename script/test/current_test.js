function renderMap_usingBuffer(){
	// This is BRUTEFORCING EVERYTHING
	let p_x = Math.floor(player.x);
	let p_y = Math.floor(player.y);
	let decalage_x = player.x - p_x;
	let decalage_y = player.y - p_y;
	let tilesize=renderFrame.tilesize;
	// ceil solved the "half tile" missing on bottom and right side
	let nbr_tiles_x = Math.ceil(renderer.width/tilesize)+2; 
	let nbr_tiles_y = Math.ceil(renderer.height/tilesize)+2;
	let nbr_tiles = nbr_tiles_x*nbr_tiles_y;
	let first_x = Math.floor(p_x - nbr_tiles_x/2);
	let first_y = Math.floor(p_y - nbr_tiles_y/2);
	let last_x = first_x + nbr_tiles_x;
	let last_y = first_y + nbr_tiles_y;
	// Updating renderframe infos
	renderFrame.top_left_tile = [first_x,first_y];
	renderFrame.bottom_right_tile = [last_x,last_y];
	renderFrame.number_horizontal_tiles = nbr_tiles_x;
	renderFrame.number_vertical_tiles = nbr_tiles_y;
	renderFrame.pixel_decalage = [tilesize*decalage_x, tilesize*decalage_y];
	// Chunk work
	let current_chunk = null;
	let chunk_tile_index = 0; //chunk_x
	let x=0, y=0; 
	let t = null, rt=null;
	let rt_pox_x = 0;
	let rt_pox_y = 0;
	// View distance work
	let view_distance = 18;
	let elevation_multiplier = 0.2;
	let distance = 0.0;
	// max view distance = view_distance + elevation_multiplier*16;
	// 18 + 0.2*16 = 21.2 tiles
	let local_elevation = 0;
	current_chunk = get_containing_chunk(chunk_buffer,p_x,p_y);
	if (current_chunk){
		local_elevation = current_chunk.tiles[getRelativeFromAbsolute(current_chunk,p_x,p_y)].charAt(1);
		local_elevation = parseInt(local_elevation,16);
	}
	view_distance += local_elevation*elevation_multiplier;
	adjustTileSpriteBufferSize(nbr_tiles);
	let i = 0;
	for ( x=first_x; x<last_x; x++ ){
		for ( y=first_y; y<last_y; y++ ){
			current_chunk = get_containing_chunk(chunk_buffer,x,y);
			if (current_chunk){
				chunk_tile_index = getRelativeFromAbsolute(current_chunk,x,y);
				t = current_chunk.tiles[chunk_tile_index];
				distance = getDistance(x, player.x ,y, player.y);
				if (t){
					//t = "4"+t.charAt(1);
					rt = tiles_sprites_buffer[i];
					//console.log(rt);
					rt.texture = resources["./textures/tiles/"+t+".png"].texture;
					rt_pos_x = tilesize*(x-first_x-1-decalage_x);
					rt_pos_y = tilesize*(y-first_y-1-decalage_y);
					rt.position.set( rt_pos_x, rt_pos_y );
					rt.width = tilesize;
					rt.height = tilesize;
					//rt.alpha = 255/(distance*64);// That one was fun
					//rt.alpha = Math.pow((view_distance-distance)/view_distance,0.8)+Math.random()*0.05;
					//if (rt.alpha>1)rt.alpha = 1;
					map_container.addChild(rt);
					//slanted_for_destroy.push(rt);
					if (p_x==x & p_y == y){
						// updating rendered_middle
						renderFrame.rendered_middle = [rt_pos_x+decalage_x,rt_pos_y+decalage_y];
					}
				}
			}
			i++;
		}
	}
}
function adjustTileSpriteBufferSize(nbr_tiles){
	// Tile sprites buffer size adjustement
	if (tiles_sprites_buffer.length != nbr_tiles){
		//need to ajust the tile sprite buffer size
		console.log(tiles_sprites_buffer.length+">>"+nbr_tiles);
		let m = tiles_sprites_buffer.length - nbr_tiles;
		if (m>0){
			for (let n=0; n<m; n++){
				a = tiles_sprites_buffer.pop();
				a.destroy(); // to avoid memory leak
			}
		}
		else {
			for (let n=0; n<-m; n++){
				let s = new Sprite(resources["./textures/tiles/AA.png"].texture);
				tiles_sprites_buffer.push(s);
			}
		}
	}
}