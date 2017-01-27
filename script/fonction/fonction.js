function getRNG(seed){
	return function (){
		var x = Math.sin(seed++) * 1000;
    	return x - Math.floor(x);
    }
}
function getDistance(x1,x2,y1,y2){
	return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
}
function resizeAll(){
	if (setup_done){
		document.documentElement.style.overflow = 'hidden';
		let size_x = window.innerWidth;
		let size_y = window.innerHeight;
		let middle_x = parseInt(size_x/2);
		let middle_y = parseInt(size_y/2);
		renderFrame.bottom_right_pixel = [size_x,size_y];
		renderer.resize(size_x,size_y);
		let r_middle_x = Math.round(renderer.width/2);
		let r_middle_y = Math.round(renderer.height/2);
		renderMap();
		/*This is how I fixed the player
		 being rendered out of place */
		main_player_sprite.position.set(
			renderFrame.rendered_middle[0],
			renderFrame.rendered_middle[1]);
	}
}
(function() {
    var wf = document.createElement('script');
    wf.src = ('https:' === document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();
function whenHasTime(doThis){
	setTimeout(doThis,1);
}