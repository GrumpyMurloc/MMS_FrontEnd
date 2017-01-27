function addChatFunction(){
	$( "#chat" ).hover(
		function() {
		$(".chatText").css("background-color", "rgba(0, 0, 0, 0.8)");
		$( this ).css("background-color", "rgba(0, 0, 0, 0.5)");
	}, function() {
		$(".chatText").css("background-color", "rgba(0, 0, 0, 0.5)");
		$( this ).css("background-color", "rgba(0, 0, 0, 0.3)");
	});

	$("#usermsg").keypress(function(e) {
    	if(e.which == 13) {
    		if ($("#usermsg").val() != ""){
    			msg = messages_generator.get_send_encrypted_message_request(player.username+": "+$("#usermsg").val());
				msg = JSON.stringify(msg);
				//console.log(msg);
				websocket_io.send(msg);
        		$("#usermsg").val("");
    		}
    	}
	});

	$("#usermsg").focusin(function() {
		writing= true
    	freezed= true;
	});
	$("#usermsg").focusout(function() {
		writing= false;
		freezed= false;
	});

	hideChat();
}

function showChat(){
	$("#usermsg").click(function(){
		$("#chatbox").toggle();
		$("#chat").css("height","250px");
		//console.log("ShowChat");
		$("#usermsg").unbind('click');
		$("#chatbox").dblclick(hideChat());
	});
	//$("#chat").click(hideChat());
}

function hideChat(){
	$("#chatbox").dblclick(function(){
		$("#chatbox").toggle();
		$("#chat").css("height","20px");
		//console.log("hideChat");
		$("#chatbox").unbind('dblclick');
		$("#usermsg").click(showChat());

	});
	
}

function login(){
	$("#btn_subLogin").unbind('click');
	usr = $("#username").val().trim();
	mdp = $("#password").val().trim();
	msg = messages_generator.get_login_request(usr,mdp);
	//console.log(msg);
	msg = JSON.stringify(msg);
	websocket_io.send(msg);
}

function subscribe(){
	$("#btn_subscribe").unbind('click'); // temporary
	usr = $("#username").val().trim();
	mdp = $("#password").val().trim();
	confirm = $("#confirm").val().trim();
	if (mdp == confirm){
		msg = messages_generator.get_subscribe_request(usr,mdp);
		msg = JSON.stringify(msg);
		websocket_io.send(msg);
	}
	else{
		$("#subscribe_error").html("Les mots de passe ne correspondent pas");
		$("#btn_subscribe").click(subscribe);
	}
}
function buy(item){
	let place= getClosestPlace();
	let username= player.username;
	msg = messages_generator.get_item_transfert_request(item,username,"player");
	//console.log(msg);
	msg = JSON.stringify(msg);
	websocket_io.send(msg);

	// Claiming the place again
	msg_claim= messages_generator.get_claim_request(place.place_uid,place.x,place.y)
	msg_claim=JSON.stringify(msg_claim);
	//console.log(msg_claim);
	websocket_io.send(msg_claim);
	//console.log("tranfering Item");
}

function sell(item){
	let place= getClosestPlace();
	let place_uid= place.place_uid;
	msg = messages_generator.get_item_transfert_request(item,place_uid,"place");
	msg = JSON.stringify(msg);
	websocket_io.send(msg);
	//console.log(msg);
	
	// Claiming the place again
	msg_claim= messages_generator.get_claim_request(place.place_uid,place.x,place.y)
	msg_claim=JSON.stringify(msg_claim);
	//console.log(msg_claim);
	websocket_io.send(msg_claim);

	//console.log("tranfering Item");

}

function addMarketFunction(place){
	var buying= false;
	var selling= true;

	$("#btn_buy").click(function(){
		if(!buying){
			buying= true;
			selling= false;
			createInventaire(place.inventory,"buy", function(item){buy(item);});
		}
	});
	$("#btn_sell").click(function(){
		if(!selling){
			selling= true;
			buying= false;
			createInventaire(player.inventory,"sell", function(item){sell(item);});
		}
	});
}

function loot(item){
	let place= getClosestPlace();
	let username= player.username;
	msg = messages_generator.get_item_transfert_request(item,username,"player");
	//console.log(msg);
	msg = JSON.stringify(msg);
	websocket_io.send(msg);

	// Claiming the place again
	msg_claim= messages_generator.get_claim_request(place.place_uid,place.x,place.y)
	msg_claim=JSON.stringify(msg_claim);
	//console.log(msg_claim);
	websocket_io.send(msg_claim);
	//console.log("tranfering Item");
}

function destroy(item){
	freezed = true; 
	msg = messages_generator.get_item_transfert_request(item,"void","player");
	msg = JSON.stringify(msg);
	websocket_io.send(msg);

}