var stage = new PIXI.Container(),
renderer = PIXI.autoDetectRenderer(1000, 1000);
document.body.appendChild(renderer.view);



//Use Pixi's built-in `loader` object to load an image
PIXI.loader
.add(["images/chat.png",
  "images/chat2.png",
  "images/chat3.png",
  "images/chat4.png"])
  .load(setup);
//This `setup` function will run when the image has loaded
function setup() {

  //Create the `cat` sprite from the texture
  var cat = new PIXI.Sprite(
    PIXI.loader.resources["images/chat.png"].texture
    );
  var cat2 = new PIXI.Sprite(
    PIXI.loader.resources["images/chat2.png"].texture
    );
  var cat3 = new PIXI.Sprite(
    PIXI.loader.resources["images/chat3.png"].texture
    );
  var cat4 = new PIXI.Sprite(
    PIXI.loader.resources["images/chat4.png"].texture
    );

  // Position Chat
  cat.anchor.set(0.5, 0.5);
  cat.rotation = 0.5;
  cat.position.set(700, 375);
  cat.scale.set(0.5, 0.5);

  // Position Chat2
  cat2.anchor.set(0.5, 0.5);
  cat2.position.set(250, 500);
  cat2.scale.set(0.2, 0.2);

  // Position Chat3
  cat3.anchor.set(0.5, 0.5);
  cat3.rotation = 1;
  cat3.position.set(500, 100);
  cat3.scale.set(0.5, 0.5);

  // Position Chat4
  cat4.anchor.set(0.5, 0.5);
  cat4.rotation = 3.5;
  cat4.position.set(250, 250);
  cat4.scale.set(0.5, 0.5);


  //Add the cat to the stage
  stage.addChild(cat);
  stage.addChild(cat2);
  stage.addChild(cat3);
  stage.addChild(cat4);

  //Render the stage   
  renderer.render(stage);
}



//Create the renderer
var renderer = PIXI.autoDetectRenderer(750, 750),
  //Create a container object called the `stage`
  stage= new PIXI.Container();
//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

//Création du loader pour convertir l'image en texture 
PIXI.loader.add("images/cat.png").load(setup);

function setup(){
  console.log(PIXI.loader.resources)
  //Création du sprite
  //var chat = new PIXI.Sprite(TextureCache["images/chat.png"]); 
  var chat = new PIXI.Sprite(PIXI.loader.resources["images/cat.png"].texture);
  // Ajouter les sprites au stage
  stage.addChild(chat);
  //Tell the `renderer` to `render` the `stage`
  renderer.render(stage);
}
