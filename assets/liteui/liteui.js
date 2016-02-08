var height;
var width;
var xul = require('./xul')
window.onload = init;
function init(){
	width = document.body.clientWidth;
	height = document.body.clientHeight;
	
	if(!width && window.nativeHost){
		width = nativeHost.getWidth(0);
		height = nativeHost.getHeight(0);
	}
	
	var canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	document.body.appendChild(canvas)
	require('./uibase').init(canvas);
}
exports.load = function(path,args){
	if(!width){
		init();
	}
	xul.load(path,args,width,height)
}