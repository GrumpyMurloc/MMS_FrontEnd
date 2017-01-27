var crypto_wrapper = {};
crypto_wrapper.decrypt = function(message){
	message = Aes.Ctr.decrypt(message, aes_password, 256);
	message = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
	return message;
}
crypto_wrapper.encrypt = function(message){
	let cipher = Aes.Ctr.encrypt(message, aes_password, 256);
	cipher = cipher.replace(/</g, "&lt;").replace(/>/g, "&gt;");
	return cipher;
}