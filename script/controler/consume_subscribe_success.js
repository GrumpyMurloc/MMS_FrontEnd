controler.consume_subscribe_success = function(message){
	let username = $("#username").val().trim();
	createHome();
	createLogin();
	$("#subscribe_result").html("Inscription réussie");
	$("#username").val(username);
	$("#password").val("");
}