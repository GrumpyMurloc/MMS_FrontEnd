// Déclaration des alias
var Container = PIXI.Container;
var autoDetectRenderer = PIXI.autoDetectRenderer;
var loader = PIXI.loader;
var resources = PIXI.loader.resources;
var TextureCache = PIXI.utils.TextureCache;
var Texture = PIXI.Texture;
var Sprite = PIXI.Sprite;
// Creation des variables globales 
var now = Date.now();
var chatCreated= false;
var writing= false;
var created= false;
var fps_buffer = 60;
var prox= false;
var freezed= false;
var setup_done = false;
var mouse_position=[0,0];
var stage = new Container();
var background_container = new Container();
var map_container = new Container();
var player_container = new Container();
var other_player_container = new Container();
var bullets_container = new Container();
var fps_container = new Container();
var lieu_container= new Container();
var fps_display = null;
var background = null;
var main_player_sprite = null;
var renderer = autoDetectRenderer({antialias: false, transparent: false, resolution: 1});
document.body.appendChild(renderer.view);
var htmlCanvas= document.getElementsByTagName("canvas")[0];
htmlCanvas.onmousemove = findMouse;
// définition des varaiable utilisé plus tard
document.body.style.margin = "0px";
var main_player_sprite = null;
var bullets = [];
var dead_bullets = [];
var other_players = [];
var invalid_other_players = [];
window.addEventListener('resize',resizeAll);
loadAllTextures(); // (this is what calls our setup stack)
var map_load_interval = null;
//Renderer options
renderer.clearBeforeRender = true;
renderer.backgroundColor = 0x000000;
//Blur options
var blurFilter = new PIXI.filters.BlurFilter();
blurFilter.blur=0;
//---------------
//Setting Z Layers, from deeper to closer
stage.addChild(map_container);
stage.addChild(lieu_container);
stage.addChild(bullets_container);
stage.addChild(player_container);
stage.addChild(fps_container);
stage.addChild(other_player_container);
//console.log("Declaring main player sprite")
fps_display = new PIXI.Text('', { font: '35px Snippet', fill: 'white', align: 'left' });
fps_container.addChild(fps_display);
fps_display.position.set(20);
var cinematicMode=false;

function toggleCinematicMode(force=null){
	cinematicMode = !cinematicMode;
	if (force!=null){cinematicMode=force;}
	if (cinematicMode){
		player_container.filters = [blurFilter]; 
		map_container.filters = [blurFilter];
		lieu_container.filters = [blurFilter];
		map_container.cacheAsBitmap = false;
		renderMap();
		fps_container.visible = false;
		blurFilter.blur=7;
		$("#chat").fadeOut();
	}
	else{
		player_container.filters = null; 
		map_container.filters = null;
		lieu_container.filters = null;
		map_container.cacheAsBitmap = false;
		renderMap();
		fps_container.visible = true;
		blurFilter.blur=0;
		$("#chat").fadeIn();
	}
}



function findMouse(mouseEvent){
	mouse_position[0] = mouseEvent.pageX;
	mouse_position[1] = mouseEvent.pageY;
	//console.log(mouse_position);
}