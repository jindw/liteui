exports.init = initCanvas;
exports.Widget = Widget;
exports.resetPage = resetPage;
exports.resetPainter = resetPainter;
exports.resetAction = resetAction;
exports.repaint = function(){
	resetPainter(currentPainter);
};

exports.useTime =useTime
exports.dispatchEvent=function(type,x,y){
	var e = {type:type}
	//console.log('event:'+[x,y])
	switch(type){
	case 'touchstart':
		return onstart(e,x,y)
	case 'touchmove':
		return onmove(e,x,y)
	case 'touchend':
	case 'touchcancel':
		return onend(e,x,y)
	}
}

if(!window.requestAnimationFrame){
	var ps = ['webkit','moz','o','ms'];
	var i = ps.length;
	while(i--){
		requestAnimationFrame = window[ps[i]+'RequestAnimationFrame']
		if(requestAnimationFrame){
			cancelAnimationFrame = window[ps[i]+'CancelAnimationFrame'];
			break;
		}
	}
	if(!requestAnimationFrame){
		requestAnimationFrame = function (callback) {
			return setTimeout(callback, 1000 / 60); 
		}
		cancelAnimationFrame = function (id) {
			return clearTimeout(id); 
		}
	}
}

function computeFps(frameStart,frameEnd){
	fpsInc++;
	fpsBegin += frameStart;
	fpsEnd += frameEnd;
	if(fpsInc>20){
		var record = [fpsInc*1000/(frameEnd-fpsStart),(fpsEnd-fpsBegin)/fpsInc,
		externalTime/fpsInc].map(function(a){return a.toFixed(1)}).join('\t');
		if(fpsRecords.push(record)>4){
			fpsRecords.shift();
		}
		console.log('fps:'+record);
		fpsStart = frameEnd;
		//console.log('fps:'+(fpsInc*1000/(time-fpsStart)).toFixed(1)+'\t count:'+fpsInc+'\t time used:'+((fpsEnd-fpsBegin)/fpsInc).toFixed(1));
		frameStart;fpsInc = fpsBegin = fpsEnd=externalTime=0;
	}
}
function useTime(t,key){
	//if(t > 5){console.log('long time task:',t,key)}
	externalTime += +t;
}


function resetPage(painter,action){
	resetAction(action)
	resetPainter(painter);
}

/* repaint */
function doRepaint(){
	//latest = new Date
	
	//*计算刷新率
	var frameStart = +new Date;
	{
		hasRepaintRequest = -1;
		var ctx = canvas.getContext('2d');
		
		if(painterChanged){
			painterChanged=false;
			//console.log('painter changed!!');
			ctx.clearRect(0,0,canvas.width,canvas.height);
		}
		if(canvas.nativeId!=null){
			if(depth){
				console.error('invalid depth status!!!');
			}
			depth++;
			try{
				var alive = currentPainter(ctx);
			}finally{
				canvas.commit(true);
			}
			depth--;
			//console.log('released!')
		}else{
			alive = currentPainter(ctx);
		}
	//}finally{
		if( alive|| hasRepaintRequest>0){//continue painter
			hasRepaintRequest = 1;
			requestFrame(doRepaint,'anima');
		}else{
			hasRepaintRequest = 0;
		}
	}
	//error no Ω
	computeFps(frameStart,+new Date);
}

function resetPainter(painter){
	if(painter != currentPainter){
		painterChanged = true;
	}
	currentPainter = painter;//Array.apply([],arguments);
	//console.log('repaint:',hasRepaintRequest,requestFrame.name)
	if(!hasRepaintRequest){
		requestFrame(doRepaint);
	}
	hasRepaintRequest = 1;
}
var depth=0;
var fpsStart = +new Date;
var fpsRecords = [];
var fpsInc = 0;
var externalTime=0;
var fpsBegin=0;
var fpsEnd=0;

//function requestFrame(fn){return setTimeout(function(){requestAnimationFrame(fn)},30); }//降频
var requestFrame = requestAnimationFrame;
var latest = new Date();
var requestFrame = function(fn,key){
	var t = new Date();
	if(t-latest > 50){
		//console.warn('base frame skiped!',key,t-latest);
	}
	latest = t;
	return requestAnimationFrame(fn,30)
}
var hasRepaintRequest;
var currentPainter;
var painterChanged;
//var currentRepaintRequest;




var config = require('./uiconfig')
var canvas;
var events = 'touchstart,touchmove,touchend,touchcancel,mousedown,mousemove,mouseup,mouseout'.split(',')
var onevent;//{-3: ontouchend, -2:ontouchmove,  -1:ontouchstart, 0:longPress, 1:singleTap,2:doubleTap,n: ntap}
var touchStart
var tapCount;
var tapTimeout;
var longPressTimeout;
var moveThreshold = 10;
var moveCount = -1;
var eventSourceClientRect;
var latestX;
var latestY;
var startX;
var startY;
var i = events.length;
var DIRTY_CHILD = 1;
var DIRTY_CHILD_REPAINT = 2;
var DIRTY_SCROLL = 4;
var DIRTY_SELF = 8;

if(window.matchMedia && window.matchMedia('(pointer:coarse)').matches){
	/*
	 * 1 none，当前设备没有任何除键盘或触控板之外的输入方式
	 * 2 fine，当前设备使用了鼠标来操作
	 * 3 coarse, 表示当前设备至少支持触屏操作，也可能同时支持鼠标
	 */
	events.splice(4);
}

//var pointer = document.createElement('div');
function initCanvas(el,action){
	if(canvas != el){
//pointer.style.cssText = 'position:absolute;display:block;width:100px;height:100px;border:1px solid red;'
//document.body.appendChild(pointer)
		//bind canvas events;
		canvas = el;
		var i = events.length;
		while(i--){
			canvas.addEventListener(events[i],eventHandler,false);
		}
		
		//canvasContext = canvas.getContext('2d')
		action && resetAction(action);
	}
}

function removeEvent(events){
	var i = events.length;
	while(i--){
		//console.log('remove event:',events[i])
		canvas.removeEventListener(events[i],eventHandler,false);
	}
}
function resetAction(action){
	reset(true);
	var oldEvent = onevent;
	onevent  = action;
	return oldEvent;
}
function onstart(e,x,y){
	touchStart = new Date
	moveCount = 0;
	//console.info('onstart!'+onevent.name)
	if(longPressTimeout){
		clearTimeout(longPressTimeout);
	}
	longPressTimeout = setTimeout(function(){
		//console.info('long press occur:'+longPressTimeout+(new Date - touchStart))
		longPressTimeout = 0;
		onevent(0,e,startX,startY,latestX|0,latestY|0);
	},config.longPressTime)
	//这里可能跳转，放在最后，方便清理
	onevent(-1,e,startX = x,startY=y,  latestX= x,latestY=y);
	//console.log('start',new Date-touchStart)
}
function onmove(e,x,y){
	if(longPressTimeout && (Math.abs(x-startX) > moveThreshold || Math.abs(y-startY) > moveThreshold)){
		longPressTimeout = clearTimeout(longPressTimeout);
	}
	moveCount++;
	//平滑算法
	latestX = latestX*0.8+x *0.2
	latestY = latestY*0.8+y *0.2
	onevent(-2,e,startX,startY,latestX|0,latestY|0);
}

function onend(e,x,y){
	try{
		//console.log('end:'+interval)
		if(longPressTimeout){
			longPressTimeout = clearTimeout(longPressTimeout);
			if(tapCount){
				tapCount ++;
				clearTimeout(tapTimeout);
			}else{
				tapCount = 1;
			}
			function tapTiger(){
				//console.log('tapTiger:'+tapCount,moveCount)
				if(longPressTimeout && new Date - touchStart<config.maxTapInterval){
					tapTimeout = setTimeout(tapTiger,config.maxTapInterval);
				}else{
					moveCount <0 && onevent(tapCount,e,startX,startY,x,y)
					if(tapCount == 3){prompt(fpsRecords.join('\n'));}
					tapTimeout = tapCount = 0;
				}
			}
			tapTimeout = setTimeout(tapTiger,config.maxTapInterval);
			//console.log('tapCount:'+tapCount,tapTimeout)
		}
		//console.log('move end2')
		onevent(-3,e,startX,startY,x,y,tapCount);
	}finally{
		reset()
	}
}
function reset(changeEventer){
	if(longPressTimeout){
		longPressTimeout=clearTimeout(longPressTimeout);
	}
	if(changeEventer && tapTimeout){
		tapTimeout = clearTimeout(tapTimeout);
		tapCount = 0;
	}
	moveCount = -1;
	eventSourceClientRect = null;
}
function eventHandler(e){
	try{
		var start = new Date();
		var firstTouch = e.changedTouches && e.changedTouches[0] || e;
		var x = firstTouch.clientX - (eventSourceClientRect|| (eventSourceClientRect = e.srcElement.getBoundingClientRect())).left;
		var y = firstTouch.clientY - eventSourceClientRect.top;//+scrollTop;
		//pointer.style.left =x+'px';pointer.style.top=y+'px'; 
		switch(e.type){
			case 'touchstart':
				var start = new Date
				if(events.length > 6){
					removeEvent(events.splice(4));
				}
			case 'mousedown':
				e.preventDefault();//setTimeout(function(){e.preventDefault();},300);//图片下载行为
				//屏蔽 onmousedown + ontouchstart 导致的重复tap
				if(moveCount <0){
					onstart(e,x,y);
				}
				//console.log('start time:'+(new Date - start))
				break;
			case 'mousemove':
				if(events.length > 6){
					removeEvent(events.splice(0,4));
				}
			case 'touchmove':
				//console.log('move:'+moveCount)
				if(moveCount<0){break;}
				onmove(e,x,y)
				e.preventDefault();
				break;
			case 'touchend':
			case 'touchcancel':
			case 'mouseout':
			case 'mouseup':
				e.preventDefault();
				//console.log('move end1',moveCount)
				if(moveCount<0){break;}
				onend(e,x,y)
				break;
			default:
				console.warn('unknow event:',e.type,e)
		}
	}finally{
		useTime(new Date - start)
	}
}
function Widget(width,height,baseDrawer,baseEvent,supportScroll){
	this.width = width || canvas.width;
	this.height = height || canvas.height;
	this.draw = baseDrawer;
	this.event = baseEvent;
	this.children = [];
	this.rangeX = [];
	this.rangeY = [];
	this.supportScroll = supportScroll;
	this.x=this.y=0;
	this.offsetX = this.offsetY =0;
	//DIRTY_CHILD = 1;DIRTY_CHILD_REPAINT = 2;DIRTY_SCROLL = 4;DIRTY_SELF = 8;
	this.dirty = DIRTY_SELF;
}

Widget.prototype.attach = function(){
	var widget = this;
	function dispatchDraw(ctx){
		//console.log('repaint widget');
		//find repaint rect
		var clips =  [];
		var cmds = [];
		prepareWidgetDraw(ctx,widget,clips,cmds);
		ctx.save()
		try{
			//console.log('top clips:',widget.height,clips)
			ctx.beginPath();
			for(var i=0,len = clips.length;i<len;){
				ctx.rect(clips[i++],clips[i++],clips[i++],clips[i++]);
			}
			//ctx.rect(0,0,widget.width,widget.height);
			ctx.closePath();
			ctx.clip();
			ctx.clearRect(0,0,widget.width,widget.height);
			doWidgetDraw(ctx,cmds,0)
		}finally{
			ctx.restore();
		}
		function doWidgetDraw(ctx,cmds,deep){
			for(var i=0;i<cmds.length;){
				var w = cmds[i++];
				var children = cmds[i++]
				var width =  w.width
				var height = w.height;
				ctx.save()
				try{
					//console.log('\t'.repeat(deep)+'widget:',w.x|0,w.y|0,w.draw && w.draw.name)
					ctx.translate(w.x,w.y);
					ctx.beginPath();ctx.rect(0,0,width,height);ctx.closePath();ctx.clip();
					w.dirty=0;
					if(w.draw instanceof Function){
						w.draw(ctx,width,height);
					}else{
						ctx.fillStyle = w.draw;
						ctx.fillRect(0,0,width,height)
					}
					
					doWidgetDraw(ctx,children,deep+1)	
				}finally{
					ctx.restore();
				}
			}
		}
	}
	function dispatchEvent(type,e,sx,sy,x,y){
		return dispatchWidgetEvent(type,e,sx,sy,x,y, widget)
	}
	resetPage(this.dispatchDraw = dispatchDraw,dispatchEvent);
}
Widget.prototype.clone = function(){
	var newNode = Object.create(this.__proto__||this);
	var cns = this.children.concat();
	var i = cns.length;
	while(i--){
		cns[i] = cns[i].clone();
	}
	for(i in this){
		newNode[i] = this[i];
	}
	newNode.children = cns;
	return newNode;
}
Widget.prototype.resize = function(w,h){
	if(w != null && w != this.width){
		this.width = w;
	}else if(h != null && h != this.height){
		this.height = h;
	}else{
		return;
	}
	var pw = this.parentWidget;
	var i = pw.children.indexOf(this);
	if(i>=0){
		i<<=1
		pw.rangeX[i+1] = pw.rangeX[i]+this.width;
		pw.rangeY[i+1] = pw.rangeY[i]+this.height;
		var maxY = Math.max.apply(Math,pw.rangeY)
		pw.offsetY = pw.drawOffsetY = Math.max(Math.min(pw.offsetY,maxY-pw.height),0);
		//console.log(pw.rangeX,pw.rangeY)
		this.repaint();
	}
}
Widget.prototype.add = function(widget,x,y){
	if(y==null){
		y = this.rangeY.length?Math.max.apply(Math,this.rangeY):0;
		if(x == null){x = 0;}
	}
	widget.parentWidget = this;
	this.children.push(widget);
	this.rangeX.push(x,widget.width+x);
	this.rangeY.push(y,widget.height+y);
	this.repaint(DIRTY_CHILD_REPAINT);
}
Widget.prototype.remove = function(widget){
	var i = this.children.indexOf(widget);
	if(i>=0){
		this.children.splice(i,1)
		this.rangeX.splice(i*2,2)
		this.rangeY.splice(i*2,2)
	}
	//TODO: mark removed rect optimize
	this.repaint(DIRTY_SCROLL);//redraw all
}

Widget.prototype.clear = function(){
	this.children.length = this.rangeX.length = this.rangeY.length=0;
	this.repaint(DIRTY_SELF);
}
/**
 * flag :1 child repaint, 2:scroll repaint,4:self repaint
 */
Widget.prototype.repaint = function(flag){
	this.dirty |=  (flag || DIRTY_SELF);
	var w = this;
	while(w.parentWidget){
		w = w.parentWidget;
		w.dirty |= DIRTY_CHILD_REPAINT;
	}
	w.dispatchDraw && resetPainter(w.dispatchDraw)
}


function prepareWidgetDraw(ctx,widget,clips,cmd,forceRedraw){
	var children = widget.children
	var rangeX = widget.rangeX
	var rangeY = widget.rangeY;
	
	var w=widget.width;
	var h = widget.height;
	var bottom = rangeY[rangeY.length-1]
	
	var parentDirty = widget.dirty;
	var drawOffsetX = 0;
	
	if(parentDirty &DIRTY_SCROLL) {
		var drawOffsetY = computeOverOffset(widget.offsetY,bottom-h);
		var dif = drawOffsetY-(widget.drawOffsetY||0);
		widget.drawOffsetY = drawOffsetY;
		//console.log('drawOffsetY:',widget.offsetY,drawOffsetY)
	}else{
		var drawOffsetY = widget.drawOffsetY||0;
	}
	
	//widget.draw && widget.draw(ctx,width,height);
	if(forceRedraw){//全部重绘
		vistChild(0,0,w,h);
	}else if(parentDirty >DIRTY_SCROLL){//全部重绘,添加选区
		forceRedraw=true;
		vistChild(0,0,w,h);
		appendDirtyRect(widget,0,0,w,h,clips);
		//appendRect;
	}else if(parentDirty==DIRTY_SCROLL){//only parent scroll
		forceRedraw=true;
		ctx.imageSmoothingEnabled = false;
		if(true){
			var absDif = Math.abs(dif)
			var mapHeight = h - absDif;
			var dirtyY = dif>0?h-dif-0:0
			//absDif+=5;
			//console.log(dif)
			vistChild(0,dirtyY,w,absDif);
			var absXy = getAbsolute(widget,w,h);
			var canvasHeight = ctx.canvas.height;
			var overedY = absXy[1] - canvasHeight;
			if(overedY > 0 && dirtyY>0){
				dirtyY -= overedY
			}else if(absXy[1]-h<0 && dirtyY==0){
				dirtyY+=h-absXy[1];
			}
			var base = appendDirtyRect(widget,0,dirtyY,w,absDif,clips)
			if(base){
				var x = base[0];
				var y =  base[1];
				var canvas = ctx.canvas;
				if(dirtyY>0){//向上滚动
					//dif>0
					y= y-dirtyY+dif;//y+dif+mapHeight;
				}else{
					//dif<0
					//y =y-dirty+0
				}
				//console.log(dif,dirtyY)
				//console.log(x,y,width,mapHeight,dif)
				ctx.putImageData(ctx.getImageData(x,y,w,mapHeight),x,y-dif);
			}
			//ctx.drawImage(canvas,x,y,width,mapHeight,x,y-dif,width,mapHeight)
		}else{
			vistChild(0,0,w,h);
			appendDirtyRect(widget,0,0,w,h,clips);
		}
		
	}else {//only for child
		vistChild(0,0,w,h);
	}
	function vistChild(x,y,w,h){
		cmd.push(widget,cmd=[])
		for(var i = 0,len = children.length;i<len;i++){
			var child = children [i]
			var childDirty = child.dirty;
			if(childDirty || forceRedraw){
				var k = i<<1;
				var x0= rangeX[k]-drawOffsetX;
				var y0 = rangeY[k]-drawOffsetY;
				var x1 = rangeX[++k]-drawOffsetX;
				var y1 = rangeY[k]-drawOffsetY;
				
				child.x = x0;
				child.y = y0;
				if(x1<x || y1<y ||x0>x+w||y0>y+h){
					//console.log(x,y,x0,y0,w,h)
					continue;
				}
				//ctx.save();ctx.translate(x0,y0);ctx.beginPath();
				try{
					//ctx.rect(0,0,w.width,w.height);ctx.closePath();ctx.clip()
					prepareWidgetDraw(ctx,child,clips,cmd,forceRedraw)
				}finally{
					//ctx.restore();
				}
			}
		}
	}
}

function getAbsolute(p,x,y){
	while(true){
		x+=p.x;
		y+=p.y
		if(p.parentWidget){
			p=p.parentWidget;
		}else{
			return [x,y]
		}
	}
}
function appendDirtyRect(p,x,y,w,h,clips){
	while(true){
		if(y<0){
			h+=y;y=0;
		}else if(y+h>p.height){
			h-=y+h-p.height;
		}
		if(h<=0){
			console.log('crop to empty')
			return;
		}
		x+=p.x;
		y+=p.y
		
		
		if(p.parentWidget){
			p=p.parentWidget;
		}else{
			clips.push(x,y,w,h);
			//if(who == 'scroll')console.log('scroll:',x,y)
			return [x,y]
			break;
		}
	}
}
function computeOverOffset(drawOffsetY,maxOffset){
	//return drawOffsetY
	if(maxOffset >0 && drawOffsetY>maxOffset || drawOffsetY<0){
		//平滑化 滚动过载 效果
		if(drawOffsetY<0){
			var over = -drawOffsetY;
			drawOffsetY = -Math.log(over/50+1)*50;
		}else {
			over = drawOffsetY-maxOffset
			drawOffsetY = maxOffset + Math.log(over/50+1)*50;
		}
	}
	return drawOffsetY||0;
}
function dispatchWidgetEvent(type,e,sx,sy,x,y,   widget){
	try{
		if(widget.event && widget.event.apply(widget,arguments)){
			return true;
		}
		var children = widget.children
		var i = children.length;
		while(i-->0){
			var w = children[i];
			if(w){
				var x0 = w.x;
				var y0 = w.y
				var x1 = x0+w.width;
				var y1 = y0+w.height;;
				if(sy<=y1 && sy>=y0
						 && sx<=x1 && sx>=x0){
					if(dispatchWidgetEvent(type,e,sx-x0,sy-y0,x-x0,y-y0,w)){
						return true;
					}
				}
			}
		}
		widget.supportScroll && doScroll(widget,type,x,y);
	}finally{
		widget.previousY = y;
	}
	//没有被消费， 顶层用于滚动
}
function doScroll(widget,type,x,y){
	var height = widget.height;
	var bottom = Math.max.apply(Math,widget.rangeY);
	var maxOffset = bottom-height
	if(type == -2 && maxOffset >0){//move
		var dy = y - widget.previousY||0;
		widget.offsetY -= dy;
		dy && widget.repaint(DIRTY_SCROLL);
	}else if(type == -3 && maxOffset>0){
		widget.repaint(DIRTY_SELF);
		var offsetY = widget.offsetY;
		if (offsetY<0 || offsetY>maxOffset){
			if(widget.restore){
				clearInterval(widget.restore);
			}
			widget.restore = setInterval(function(){
				if(offsetY<0){
					widget.offsetY = offsetY=Math.min(offsetY*.9+10,0)//Math.min(offsetY+=10,0)
					widget.repaint(DIRTY_SCROLL);
				}else if(offsetY>maxOffset){
					widget.offsetY = offsetY=Math.max(offsetY-10-(offsetY-maxOffset)*.1,maxOffset)//Math.max(offsetY-=10,maxOffset)
					widget.repaint(DIRTY_SCROLL);
				}
				
				if(offsetY>=0 && offsetY<=maxOffset){
					//console.log('end overscroll',offsetY)
					widget.restore = clearInterval(widget.restore);
					widget.repaint(DIRTY_SELF);
				}
				//console.log('overscroll',widget.offsetY)
				
			},20);
		}
	}
	//console.log('event:'+[offsetY,type,e,sx,sy,x,y])
}

