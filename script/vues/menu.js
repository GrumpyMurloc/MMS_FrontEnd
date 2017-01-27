function createPlaceMenu(place){
	created= false;
	freezed= true;
	console.log("cinematic_mode_on");
	toggleCinematicMode(true); 
	//console.log("Creating PlaceMenu");
	$("#menu").empty();
	$("#menu").append("<h1 id='name'>"+place.place_name+"</h1>");
	let type= place.place_type;
	if (place.inventory.length>0){
		if(type== "market"){
			$("#menu").append(
				$("<div id='operation'>"
					+"<button type='button' class='operation' id='btn_buy'>Buy</button>"
					+"<button type='button' class='operation' id='btn_sell'>Sell</button>"
				+"</div>"));
			$("#menu").append($("<div id='sousmenu'></div>"));
			addMarketFunction(place);
			//
			createInventaire(place.inventory, "buy", function(item){buy(item);});
			$("#btn_buy").trigger("click");
		}
		else if (type== "ruin"){
			$("#menu").append($("<div id='sousmenu'></div>"));
			createInventaire(place.inventory, "loot", function(item){loot(item);});
		}
	}
	else{
		$("#menu").append("<h1 id='message'>Warning! this place is covered in poverty</h1>")
	}
}

function createPauseMenu(){
	console.log("cinematic_mode_on");
	toggleCinematicMode(true); 
	//console.log("Creating PauseMenu");
	$("#menu").empty();
	$("#menu").append($("<button type='button' id='bResume'>Resume</button>"));
	$("#bResume").click(function(){
		freezed= false;
		$("menu").empty();	
	});
}

function createInventory(){
	console.log("cinematic_mode_on");
	toggleCinematicMode(true); 
	//console.log("creation de l'inventaire")
	let inventory= player.inventory;
	let name= player.username;
	let callback= function(item){destroy(item);};
	$("#menu").empty();
	$("#menu").append("<h1 id='name'>"+name+"</h1>");
	if (inventory.length>0){
		$("#menu").append($("<div id='sousmenu'></div>"));
		createInventaire(inventory, "destroy", callback);
	}
	else{
		$("#menu").append("<h1 id='message'>Dammnnn you poor!</h1>")
	}
	//createInventaire(player.inventory,"destroy",console.log("Destroy"));
}

function createClaim(){
	let place= getClosestPlace();
	let prox= getProximite();
	if(!freezed){
		if(prox){
			if (!place.claimed && !created){
				$("#menu").empty();
				//console.log("creation du claim "+place.place_name)
				$("#menu").append($("<button type='button' id='bClaim'>Claim Place</button>"));
				$("#menu").append($("<h1 id='name'>"+place.place_name+"</h1>"));
				$("#bClaim").click(function(){
					freezed= true;
					//console.log("claiming");
					msg= messages_generator.get_claim_request(place.place_uid,place.x,place.y)
					msg=JSON.stringify(msg);
					//console.log(msg);
					websocket_io.send(msg);
					//place.claimed=true;
				});
				created= true;
			}
			else if (place.claimed && !created){
				$("#menu").empty();
				$("#menu").append($("<h1 id='name'>"+place.place_name+"</h1>"));
				created= true;
			}
			else if (place.claimed && created){
				//console.log("destroy claim");
				$("#menu").empty();
				$("#menu").append($("<h1 id='name'>"+place.place_name+"</h1>"));
				created= false;
			}
		}
		else{
			$("#menu").empty();

			created= false;
		}
	}
}

//<button onclick='addLieu()' type='button' id='bAddLieu'>Ajouter lieu</button>
function createInventaire(inventory, name, callback){
	//console.log("CreationItemPlace");
	$("#sousmenu").empty();
		for (let i=0; i<inventory.length; i++){
			let uid= [inventory[i].item_uid];
			$("#sousmenu").append(
				$("<div class='item' id='"+uid[0]+"'>"
					+"<p>Name: "+inventory[i].name+"</p>"
					+"<p class='capitalize'>Type: "+inventory[i].item_type+"</p>"
					+"<p>Value: "+inventory[i].base_value+"</p>"
					+"<button type='button' class='bOperation' id='b"+uid[0]+"'>"+name+"</button>"
				+"</div>"));
			$("#b"+uid[0]).unbind('click');
			$("#b"+uid[0]).click(function(){callback(uid);});
		}
	$("#sousmenu").css( { "margin-left" : "25%", "margin-right" : "25%" } );

}

// Création du menu de login AKA Home page
function createHome(){
	$("#menu").empty();
	$("#menu").append(
		$(
		"<div class='connect' id='login'>"+
			"<button id='btn_login'>Login</button> "+
		    "<button id='btn_subscribe'>Subscribe</button>"));
		"</div>"
	$("#btn_login").click(function(){
		createLogin();
	});
	$("#btn_subscribe").click(function(){
		createSubscribe();
	});				
}


function createLogin(){
	$("#menu").empty();
	$("#menu").append(
		$(
		"<div class='connect' id='login'>"+
			"<form>"+
				"<p id='subscribe_result'></p>"+
				"<p id='login_error' class='error_msg'></p>"+
				"<label for='username'>Username : </label>"+
				"<input type='text' value='testing' id=username></br></br>"+
				"<label for='password'>Password  : </label>"+
				"<input type='password' value='testing' id=password></br></br>"+
				"<button type='button' id='btn_subLogin'>Login</button>"+
				"<button type='button' id='btn_cancel'>Cancel</button>"+
			"</form>"+
		"</div>"));
	$("#btn_cancel").click(createHome);
	$("#btn_subLogin").click(login);
}

function createSubscribe(){
	$("#menu").empty();
	$("#menu").append(
		$(
		"<div class='connect' id='subscribe'>"+
			"<p id='subscribe_error' class='error_msg'></p>"+
			"<form>"+
				"<label for='username'>Username : </label>"+
				"<input type='text' id=username></br></br>"+
				"<label for='password'>Password  : </label>"+
				"<input type='password' id=password></br></br>"+
				"<label for='confirm'>Confirm : </label>"+
				"<input type='password' id=confirm></br></br>"+
				"<button type='button' id='btn_subscribe'>Subscribe</button>"+
				"<button type='button' id='btn_cancel'>Cancel</button>"+
		  	"</form>"+
		  "</div>"));
	$("#btn_cancel").click(createHome);
	$("#btn_subscribe").click(subscribe);
}

function createChat(){
	if(!chatCreated){
		//console.log("creation du chat");
		$("#chat").empty();
		$("#chat").append(
			$("<div class='chatText' id='chatbox'>"+
			  		"<span style= 'color:grey'>Double click to close chat</span></br>"+
			  "</div>"+  
		      "<input class='chatText' type='text' id='usermsg' size='63'/>"));
		$("#chat").css("background-color", "rgba(0, 0, 0, 0.3)");
		addChatFunction();
		chatCreated=true;
	}
}
