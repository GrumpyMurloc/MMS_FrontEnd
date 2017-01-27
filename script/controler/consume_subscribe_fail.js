controler.consume_subscribe_fail = function(message){
	$("#subscribe_error").html(message.reason);
	$("#btn_subscribe").click(subscribe);
}