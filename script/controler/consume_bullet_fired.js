controler.consume_bullet_fired = function(message){
	//console.log("bullet received from server!!!");
	spawnBullet(message.x,message.y,message.angle,message.speed);
}