function quickLoad(source){
	// everytime you use this, a kitten dies
	document.write("<script src='"+source+"'></script>");
}
//weird jquery import because of electron
document.write("<script>if (typeof module === 'object') {window.module = module; module = undefined;}</script>");  
quickLoad(	"./script/library/jquery-3.1.1.min.js"			);
document.write("<script>if (window.module) module = window.module;</script>");
//actual imports
quickLoad(	"./script/controler/preloadControler.js"		);
quickLoad(	"./script/modele/socket.js"						);
quickLoad(	"./script/vues/menu.js"							);
quickLoad(	"./script/messages/preloadMessageGenerator.js"	);
quickLoad(	"./script/library/pixi.min.js"					);
quickLoad(	"./script/modele/buffers.js"					);
quickLoad(	"./script/modele/bullet.js"						);
quickLoad(	"./script/modele/keyboard.js"					);
quickLoad(	"./script/modele/lieu.js"						);
quickLoad(	"./script/crypto/aes.js"						);
quickLoad(	"./script/crypto/aes-ctr.js"					);
quickLoad(	"./script/crypto/crypto_wrapper.js"				);
quickLoad(	"./script/config/aes_config.js"					);
quickLoad(	"./script/fonction/button_function.js"			);
quickLoad(	"./script/fonction/chunk_functions.js"			);
quickLoad(	"./script/fonction/fonction.js"					);
quickLoad(	"./script/fonction/local_event_handler.js"		);
quickLoad(	"./script/fonction/menuFonction.js"				);
quickLoad(	"./script/vues/renderFrame.js"					);
quickLoad(	"./script/vues/rendering.js"					);
quickLoad(	"./script/vues/texture_loading.js"				);
quickLoad(	"./script/test/testRequest.js"					);
quickLoad(	"./script/modele/player.js"						);
quickLoad(  "./script/config/pixi_declarations.js"			);
quickLoad(	"./script/main.js"								);