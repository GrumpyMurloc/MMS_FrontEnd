// Alias des différent fonction pixi
var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite

document.body.appendChild(renderer.view);
var stage = new Container;
var chat = new Container;
var player = new Container;


//Use Pixi's built-in `loader` object to load an image
loader.add(
  ["images/chat.png",
  "images/player.png"]
  )
  .load(setup);


//This `setup` function will run when the image has loaded
function setup() {
    for(let i=0; i < 3; i++){
        // créer le sprite du chat provenant de la texture
        var cat = new Sprite(
          resources["images/cat.png"].texture
        );
        cat.anchor.set(0.5, 0.5);
        cat.position.set(500, 375);
        cat.scale.set(0.5, 0.5);
        chat.addChild(cat);
    }

    for(let i=0; i < 3; i++){
        // créer le sprite du chat provenant de la texture
        var cat = new Sprite(
          resources["images/player.png"].texture
        );

       cat.anchor.set(0.5, 0.5);
       cat.position.set(500, 375);
       cat.scale.set(0.5, 0.5);
       player.addChild(cat);

    }
  
  stage.addChild(chat);
  stage.addChild(player);
  renderer.render(stage);

}

