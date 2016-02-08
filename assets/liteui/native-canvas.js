exports.createCanvas = function(id){
	if(nativeHost){
		//console.log("mainCancas"+mainCanvas)
		//nativeHost.close();
		//nativeHost = null;
		return new Canvas(id);
	}
	return document.createElement('canvas')
};
//console.log(require('./compass').dispatchEvent)
var OP_MOVE2 = 0;
var OP_LINE2 = 1;
var OP_CLOSE = 2;
var OP_ARC6 = 3;

var CMD_PROXY = 0;
var CMD_CLIP = 1;
var CMD_IMG = 2;
var CMD_FILL = 3;
var CMD_STROKE = 4;
var CMD_FILL_TEXT =5;
var CMD_STROKE_TEXT = 6;
var CMD_CLEAR = 7;

var CMD_SAVE =8;
var CMD_RESTORE = 9;
var CMD_TRANSLATE =10;
var CMD_MEASURE = 11;
var CMD_STATUS = 12;

var PIx2 = 2*Math.PI;
var nativeHost =exports.nativeHost= window.nativeHost;


function executeCommand(ctx,cmd,args){
	var cmds = ctx.cmds;
	switch(cmd){
	case CMD_IMG://draw image 无需样式，只需要alpha
	case CMD_FILL:
	case CMD_STROKE:
	case CMD_FILL_TEXT :
	case CMD_STROKE_TEXT :
		var prefixArg = ctx.globalAlpha * 255+0.5;
	case CMD_MEASURE:
		if(!ctx._configJSON ){//&& cmd != CMD_IMG){
			var s = config(ctx)//
			executeCommand(ctx,CMD_STATUS,s)
		}
		break;
	case CMD_PROXY:
		if(args.cmds.length){
			var prefixArg = args.nativeId||0;
			//console.log('proxy:'+prefixArg+"%"+args.cmds.length+args.cmds)
			args = args.cmds.splice(0).join('');
		}else{
			return;
		}
	}
	
	var cmdLine = [cmd,args.length]
	if(prefixArg != null){
		cmdLine[1]++;
		cmdLine.push(prefixArg)
	}
	cmdLine = cmdLine.map(encoderValue);
	cmdLine.push(args);
	cmds.push(cmdLine.join(''))
	if(CMD_MEASURE == cmd ){
		return ctx.commit(false);
	}
	
}

Canvas.prototype.commit = function(complete){
	//console.log("canvas native id:"+this.nativeId+"/"+complete)
	var rtv = nativeHost.commit(this.nativeId,this.cmds.join(''),!!complete);
	this.cmds = [];
	return rtv;
}

function createCanvas(){
	return window.nativeHost? new Canvas() : document.createElement('canvas');
}
function Canvas(id){
	this.style = {}//avoid null pointer
	this.stack = [];
	this.saveCount = 0;
	this._style = {
		font:'10px sans-serif',
		fillStyle:'#000',
		strokeStyle:'#000',
		lineCap:"butt",lineJoin:"miter", lineWidth:1,miterLimit: 10,
		// "left" || "right" || "center" ||---- "start" || "end";
		textAlign:"left",
		// "top" || "hanging" || "middle" || "alphabetic" || "ideographic" || "bottom";
		textBaseline:"alphabetic"
	};
	this._styleJSON;
	this.nativeId = nativeHost.createCanvas(id>=0?id:-1);
	this.canvas = this;
	this.globalAlpha = 1;
	this.cmds = [];
}

/*
unsupport lab feature:
filter,direction,currentTransform,imageSmoothingEnabled
unsupport featrue:
globalCompositeOperation
lineDashOffset
shadowBlur,shadowColor,shadowOffsetX,shadowOffsetY
 */
"font,fillStyle,strokeStyle,lineCap,lineJoin,miterLimit,lineWidth,textAlign,textBaseline".//,globalAlpha".
	replace(/\w+/g,function(attr){
		Object.defineProperty(Canvas.prototype, attr, {
			get: function() { return this._style[attr]; },
			set: function(v) {if(this._style[attr] !== v){this._styleJSON = 0; this._style[attr] = v;} }
		});
	})
Object.defineProperty(Canvas.prototype, 'width', {
	get: function() { return this._width; },
	set: function(v) {nativeHost.setWidth(this.nativeId,v);this._width = v }
});
Object.defineProperty(Canvas.prototype, 'height', {
	get: function() { return this._height; },
	set: function(v) {nativeHost.setHeight(this.nativeId,v);this._height = v; }
});


function encodePath(path){
	return path && String.fromCharCode.apply(String,path);path.map(encoderValue).join('')
}

function encoderValue(a){return String.fromCharCode(a);}
function config(c){
	if(c._styleJSON){
		return c._styleJSON;
	}
	var style = c._style;
	var buf = ['{"']
	for(var v in style){
		buf.push(v,'":');
		//if(v == 'fillStyle'){console.log('fillStyle:'+style[v])}
		if((v = style[v]) instanceof Object ){//"^rgba?\\((\\d+)?,(\\d+),(\\d+)(,[\\d\\.]+)?\\)$|#"
			buf.push('"',String(v),'","');
		}else if(typeof v == 'string'){
			buf.push('"',formatColor(v).replace(/["\\]/g,'\\$&'),'","');
		}else{
			buf.push(v,',"')
		}
	}
	buf.push(buf.pop().replace(',"','}'))
	//console.log(buf.join(''))
	return c._styleJSON = buf.join('');
}

/* draw */

var namedColor = "BLACK,#FF000000,DKGRAY,#FF444444,GRAY,#FF888888,LTGRAY,#FFCCCCCC,WHITE,#FFFFFFFF,RED,#FFFF0000,GREEN,#FF00FF00,BLUE,#FF0000FF,YELLOW,#FFFFFF00,CYAN,#FF00FFFF,MAGENTA,#FFFF00FF,TRANSPARENT,#00000000".split(',')
function formatColor(v){
	var color = v.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\.\d]+))?|^#[0-9a-f]+/i)
	if(color){
		var r = color[1];
		if(r){
			v = ((((color[4] || 1) * 0xFF)<<24)|(r << 16) | (color[2]<<8) | (color[3])).toString(16);
			while(v.length<8){
				v = '0'+v
			}
			v='#'+v;
		}else{
			v = v.replace(/#(?:(.)(.)(.)$)?/,'#FF$1$1$2$2$3$3').toUpperCase()
		}
	}else{
		var i = namedColor.indexOf(v.toUpperCase());
		if(i>=0){
			 v = namedColor[i+1]
		}
	}
	return v;
}

/* clip */
Canvas.prototype.clip = function(){
	executeCommand(this,CMD_CLIP,encodePath(this._path))
}
Canvas.prototype.fill = function(){
	executeCommand(this,CMD_FILL,encodePath(this._path))
}

Canvas.prototype.stroke = function(){
	executeCommand(this,CMD_STROKE,encodePath(this._path))
}
Canvas.prototype.drawImage = function(img,x,y,sw,sh,dx,dy,dw,dh){
	var args = [];
	args.push.apply(args,arguments)
	switch(args.length){
	case 3:
	case 5:
	case 9:
		img.cmds.length && executeCommand(this,CMD_PROXY,img)
		args[0] = img.nativeId;
		console.log('image id:'+args[0])
		executeCommand(this,CMD_IMG,encodePath(args))
		break;
	default:
		console.error('error arguments'+args)
	}
	
}
/* text */
Canvas.prototype.measureText = function(text){
	return {width:executeCommand(this,CMD_MEASURE,text)};
}

Canvas.prototype.fillText = function(text,x,y,maxWidth){
	executeCommand(this,CMD_FILL_TEXT,encodePath([x,y,maxWidth|0])+text)
}

Canvas.prototype.strokeText = function(text,x,y,maxWidth){
	executeCommand(this,CMD_STROKE_TEXT,encodePath([x,y,maxWidth|0])+text)
}

Canvas.prototype.clearRect = function(x,y,w,h){
	executeCommand(this,CMD_CLEAR,encodePath([x,y,w,h]))
}
/* path */
function p(c){
	return c._path || (c._path= []);
};
function pi2char(a){
	if(a){
		a = a%PIx2||PIx2;
		if(a<0){
			a +=PIx2;
		}
	}
	return (a/PIx2 * 0xfff)
}
Canvas.prototype.beginPath = function(){this._path = [];}
Canvas.prototype.moveTo = function(x,y){p(this).push(OP_MOVE2,x,y);}
Canvas.prototype.lineTo = function(x,y){p(this).push(OP_LINE2,x,y);}
Canvas.prototype.closePath = function(){p(this).push(OP_CLOSE);}
Canvas.prototype.arc = function(x, y, r, startAngle, endAngle, anticlockwise){
	var a1 = pi2char(startAngle);
	var ad = pi2char(endAngle-startAngle)
	p(this).push(OP_ARC6,x,y,r,a1 ,a1+ad,anticlockwise?1:0)
}

/* paint state */

Canvas.prototype.save = function(){
	executeCommand(this,CMD_SAVE,'')
}
Canvas.prototype.restore = function(){
	executeCommand(this,CMD_RESTORE,'')
}
/* transform*/
Canvas.prototype.translate = function(dx,dy){
	executeCommand(this,CMD_TRANSLATE,encodePath([dx,dy]))
}

Canvas.prototype.rotate = function(){}
Canvas.prototype.setTransform = function(){}
Canvas.prototype.scale = function(){}
Canvas.prototype.transform = function(){}
Canvas.prototype.resetTransform = function(){}


/* gradient */
function CanvasGradient(type){
	var values = [];
	this.addColorStop = function(r,color){
		values.push(r+formatColor(color));
	}
	this.toString = function(){
		return type + values.sort().join(',');
	}
}
CanvasGradient.prototype = new String()
Canvas.prototype.createLinearGradient = function(x0,y0,x1,y1){return new CanvasGradient('linear:'+[x0|0,y0|0,x1|0,y1|0,''].join(','))}
Canvas.prototype.createRadialGradient = function(x0,y0,r0,x1,y1,r1){return new CanvasGradient('radial:'+[x0|0,y0|0,r0|0,x1|0,y1|0,r1|0].join(','))}
/* image */
Canvas.prototype.getImageData = function(){}
Canvas.prototype.putImageData = function(){}
/* composite */
Canvas.prototype.rect = function(x,y,w,h){
	this.beginPath();
	this.moveTo(x,y);//start subpath
	this.lineTo(x+w,y);
	this.lineTo(x+w,y+h);
	this.lineTo(x,y+h);
	this.closePath();
}

Canvas.prototype.strokeRect = function(x,y,w,h){
	this.rect(x,y,w,h);
	this.stroke();
}
Canvas.prototype.fillRect = function(x,y,w,h){
	this.rect(x,y,w,h);
	this.fill();
}


/* util */
Canvas.prototype.getContext = function(){
	return this;
}
Canvas.prototype.addEventListener = function(){console.log('native canvas not support event listener')}
/* others unimplements */

Canvas.prototype.setLineDash = function(){}
Canvas.prototype.arcTo = function(){}
Canvas.prototype.bezierCurveTo = function(){}
Canvas.prototype.createImageData = function(){}
Canvas.prototype.createPattern = function(){}
Canvas.prototype.drawFocusIfNeeded = function(){}
Canvas.prototype.ellipse = function(){}
Canvas.prototype.getLineDash = function(){}
Canvas.prototype.isPointInPath = function(){}
Canvas.prototype.isPointInStroke = function(){}
Canvas.prototype.quadraticCurveTo = function(){}
//Canvas.prototype.scrollPathIntoView = function(){}
