function loadAllTextures(callback){
	console.log("Loading textures...");
	loader.add(["./images/chat.png",
	"./images/chat2.png",
	"./images/chat3.png",
	"./images/chat4.png",
	"./textures/ruin.png",
	"./textures/Player.png",
	"./textures/Bullet.png",
	"./textures/triangle.png",
	"./textures/tiles/0.png",
	"./textures/tiles/1.png",
	"./textures/tiles/2.png",
	"./textures/tiles/3.png",
	"./textures/tiles/4.png",
	"./textures/tiles/5.png",
	"./textures/tiles/6.png",
	"./textures/tiles/7.png",
	"./textures/tiles/8.png",
	"./textures/tiles/9.png",
	"./textures/tiles/A.png",
	"./textures/tiles/B.png",
	"./textures/tiles/C.png",
	"./textures/tiles/D.png",
	"./textures/tiles/E.png",
	"./textures/tiles/_E.png",
	"./textures/tiles/F.png",
	"./textures/Circle2.png"
	]).load(function(){
		console.log("Done loading textures");
		return callback;
	}());
}