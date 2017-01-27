controler.consume_chat_message = function(received){
	let time = received.time;
	let encrypted = received.encrypted;
	let message = received.message;
	if (encrypted){message = crypto_wrapper.decrypt(message);}
	$("#chatbox").append("<span>"+message+"</span></br>");
	$("#chatbox").animate({ scrollTop: $("#chatbox").prop("scrollHeight") - $("#chatbox").height() }, 100);
}