controler.consume_login_fail = function(message){
	$("#login_error").html(message.reason.replace("_"," "));
	$("#btn_subLogin").click(login);
}