function getNewBullet(sprite) {
	b = {
		"max_distance":256,
		"dx": 0.0,
		"dy": 0.0,
		"x":0.0,
		"y":0.0,
		//"speed":0.8,
		"speed":0.4,
		"sprite" :sprite,
		"collide":true
	};
	b.tick = function(){
		//console.log("bullet moving");
		this.x+=this.dx;
		this.y+=this.dy;
		this.max_distance-= 1;
		if (this.max_distance <=0){
			this.sprite.destroy();
			dead_bullets.push(this);
			return;
		}
		// collisions
		if (this.collide){
			let px = player.x;
			let py = player.y;
			//function getDistance(x1,x2,y1,y2){
			let distance = Math.abs(getDistance(px,this.x,py,this.y));
			if (distance<2){
				this.collide = false; // can't collide multiple time
				player.dx += this.dx*0.8;
				player.dy += this.dy*0.8;
				messages_generator.auto_send_moving_request(true);
			}
		}
	}
	return b;
}
function spawnBullet(x,y,angle,speed){
	b = getNewBullet(new Sprite(resources["./textures/Bullet.png"].texture));
	b.x = x;
	b.y = y;
	b.dx = Math.cos(angle)*speed;
	b.dy = Math.sin(angle)*speed;
	b.sprite.anchor.set(0.5, 0.5);
	b.sprite.width = 16;
	b.sprite.height = 24;
	b.sprite.rotation = Math.PI/2+angle;
	b.sprite.position.set(x,y);
	bullets.push(b);
	bullets_container.addChild(b.sprite);
	//console.log(bullets);
}
function addBullet(){
	//console.log("added bullet");
	let minimum_time = 1000/3;// milliseconds (maximum 10 per seconds)
	let n = new Date().getTime();
	let timedelta = n - player.last_shooting_time;
	if (timedelta>minimum_time){
		b = getNewBullet(new Sprite(resources["./textures/Bullet.png"].texture))
		b.collide = false;
		b.dx= Math.cos(player.angle)*b.speed;
		b.dy= Math.sin(player.angle)*b.speed;
		b.x = player.x+2*b.dx;
		b.y = player.y+2*b.dy;
		b.sprite.anchor.set(0.5, 0.5);
		b.sprite.width = 16;
		b.sprite.height = 24;
		b.sprite.rotation = Math.PI/2+player.angle;
		b.sprite.position.set(0,0);
		bullets.push(b);
		bullets_container.addChild(b.sprite);
		player.last_shooting_time=n;
		let message = "";
		message = messages_generator.get_bullet_spawn_request(b.x,b.y,player.angle,b.speed);
				message = JSON.stringify(message);
				websocket_io.send(message);
	}
	
}
function moveBullets(){
	for (i=0;i<bullets.length;i++)
		bullets[i].tick();
	for (i=0;i<dead_bullets.length;i++){
			index = bullets.indexOf(dead_bullets[i]);
		if (index > -1) {
	    	bullets.splice(index, 1);
	    	//console.log("bullet died");
		}
	}

}
