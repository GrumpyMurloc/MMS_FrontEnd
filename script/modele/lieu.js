function getNewLieu(sprite){
	lieu = {
		"x": Math.random()*64,
		"y": Math.random()*64,
		"sprite" :sprite,
		"claimed": false,
	};
	/*b.tick = function(){
		this.x+=this.dx;
		this.y+=this.dy;
		this.max_distance-= 1;
		if (this.max_distance <=0){
			this.sprite.destroy();
			dead_bullets.push(this);
		}
	}*/
	return lieu;
}

function getProximite(){
	let place= getClosestPlace();
	if (place!=null){
		let x = player.x - place.x;
		let y = player.y - place.y;
		let distance = Math.sqrt( x*x + y*y );
		if (distance<=5){
			prox=true;
		}
		else{
			prox=false;
		}
	}
	else{
		prox=false;
	}
	return prox;
}
function getPlaces(){	
	let list_place=[];
	for (let i=0;i<chunk_buffer.length;i++){
		for (let j=0;j<chunk_buffer[i].length;j++){
			let work_chunk= chunk_buffer[i][j];
			for (k=0; k<work_chunk.lieux.length; k++){
				if (work_chunk.lieux[k]!=null)
					list_place.push(work_chunk.lieux[k]);
			}
		}
	}
	return list_place;
}

function getClosestPlace(){
	let list_place= getPlaces();
	let temp=1000;
	let place, x, y, distance, closestPlace;
	for(let i=0; i<list_place.length;i++){
		place= list_place[i]; 
		if (place!=null){
			x = player.x - place.x;
			y = player.y - place.y;
			distance = Math.sqrt( x*x + y*y );
			if (distance<temp){
				closestPlace= place;
				temp = distance;
			}
		}
	}
	return closestPlace;
}


function addLieu(){
	//console.log("added bullet");
	//for(let i=0; i<n; i++){
	let p_x= Math.floor(player.x);
	let p_y= Math.floor(player.y);
	let chunk= get_containing_chunk(p_x,p_y);
	if(chunk){
		lieu = getNewLieu(new Sprite(resources["./textures/ruin.png"].texture));
		lieu.x= chunk.left_x+lieu.x;
		lieu.y= chunk.top_y+lieu.y;
		chunk.lieux.push(lieu);
		//lieu.sprite.anchor.set(0.5, 0.5);
		lieu.sprite.width = renderFrame.tilesize;
		lieu.sprite.height = renderFrame.tilesize;
		lieu_container.addChild(lieu.sprite);
		//console.log("lieu ajouter");
		//console.log(lieu)
	}
	//}
}


