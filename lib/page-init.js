
export function initPainter(page,painter){
	var container = page.container; 
	var canvas = document.createElement('canvas');
	var editor = document.createElement('div');
	canvas.style.cssText = 'position:absolute;width:100%;height:100%'
	editor.style.cssText = 'position:absolute;width:100%;height:100%'
	var ctx = canvas.getContext('2d');
	var offlineCanvas;
	var offlineCtx;
	container.insertBefore(canvas,container.firstChild);
	container.appendChild(editor);
	page.editor = {container:editor};

	/* repaint */
	function doRepaint(){
		//latestPaint = new Date
		
		//*计算刷新率
		var frameStart = +new Date;
		{
			hasRepaintRequest = -1;
			
			// if(painterChanged){
			// 	painterChanged=false;
			// 	//console.log('painter changed!!');
			// 	//ctx.clearRect(0,0,canvas.width,canvas.height);
			// }

			//let alive = 
			if(!offlineCtx){
				offlineCanvas = canvas.cloneNode();
				offlineCtx = offlineCanvas.getContext('2d');
			}

			page.paint(offlineCtx,canvas);
			ctx.drawImage(offlineCanvas,0,0)

			// if( alive|| hasRepaintRequest>0){//continue painter
			// 	hasRepaintRequest = 1;
			// 	//requestFrame(doRepaint,'anima');
			// }else{
			// 	hasRepaintRequest = 0;
			// }
		}
		//error no Ω
		computeFps(frameStart,+new Date);
	}


	//function requestFrame(fn){return setTimeout(function(){requestAnimationFrame(fn)},30); }//降频
	var requestFrame = requestAnimationFrame;

	// requestFrame = function (fn,key){
	// 	var t = new Date();
	// 	if(t-latestPaint > 50){
	// 		//console.warn('base frame skiped!',key,t-latestPaint);
	// 	}
	// 	latestPaint = t;
	// 	return requestAnimationFrame(fn,30)
	// }
	//var latestPaint = new Date();
	
	var hasRepaintRequest;
	var painterChanged;

	/**
	 * fps
	 */

	 return ()=>requestFrame(doRepaint);

}



var fpsStart = +new Date;
var fpsRecords = [];
var fpsInc = 0;
var externalTime=0;
var fpsBegin=0;
var fpsEnd=0;
function computeFps(frameStart,frameEnd){
	fpsInc++;
	fpsBegin += frameStart;
	fpsEnd += frameEnd;
	if(fpsInc>20){
		let avgTime = (fpsEnd-fpsBegin)/fpsInc;//evege time(ms);
		let maxFps = 1000/avgTime;//理论最大刷新率
		let realFps = fpsInc*1000/(frameEnd-fpsStart);//真实刷新次数

		var record = [maxFps,avgTime,realFps,
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
export function initEvent(page,onevent){
	let container = page.container;
	//event

	function onstart(e,x,y){
		touchStart = new Date

		//这里可能跳转，放在最后，方便清理
		onevent(-1,startX = latestX= x,e,startY= latestY=y);

		moveCount = 0;
		//console.info('onstart!'+onevent.name)
		if(longPressTimeout){
			clearTimeout(longPressTimeout);
		}
		longPressTimeout = setTimeout(function(){
			//console.info('long press occur:'+longPressTimeout+(new Date - touchStart))
			longPressTimeout = 0;
			onevent(0,startX,startY,e);
		},longPressTime)
		//console.log('start',new Date-touchStart)
	}
	function onmove(e,x,y){
		if(longPressTimeout && (Math.abs(x-startX) > moveThreshold || Math.abs(y-startY) > moveThreshold)){
			longPressTimeout = clearTimeout(longPressTimeout);
		}
		moveCount++;
		//平滑算法
		latestX = (latestX*0.8+x *0.2)|0;
		latestY = (latestY*0.8+y *0.2)|0;
		onevent(-2,latestX,latestY,e,startX,startY);
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
					if(longPressTimeout && new Date - touchStart<maxTapInterval){
						tapTimeout = setTimeout(tapTiger,maxTapInterval);
					}else{
						moveCount <0 && onevent(tapCount,x,y,e,startX,startY)
						if(tapCount == 3){prompt(fpsRecords.join('\n'));}
						tapTimeout = tapCount = 0;
					}
				}
				tapTimeout = setTimeout(tapTiger,maxTapInterval);
				//console.log('tapCount:'+tapCount,tapTimeout)
			}
			//console.log('move end2')
			onevent(-3,x,y,e,startX,startY);
		}finally{
			resetEvent()
		}
	}
	function resetEvent(changeEventer){
		if(longPressTimeout){
			longPressTimeout=clearTimeout(longPressTimeout);
		}
		if(changeEventer && tapTimeout){
			tapTimeout = clearTimeout(tapTimeout);
			tapCount = 0;
		}
		moveCount = -1;
		//eventSourceClientRect = null;
	}
	function eventHandler(e){
		try{
			// console.log(e)
			var start = new Date();
			var firstTouch = e.changedTouches && e.changedTouches[0] || e;
			var eventSourceClientRect = container.getBoundingClientRect();
			var x = (firstTouch.clientX - eventSourceClientRect.left)|0;
			var y = (firstTouch.clientY - eventSourceClientRect.top)|0;//+scrollTop;
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
			//事件耗时
			useTime(new Date - start);
		}
	}

	// function dispatchEvent(type,x,y){
	// 	var e = {type:type}
	// 	//console.log('event:'+[x,y])
	// 	switch(type){
	// 	case 'touchstart':
	// 		return onstart(e,x,y)
	// 	case 'touchmove':
	// 		return onmove(e,x,y)
	// 	case 'touchend':
	// 	case 'touchcancel':
	// 		return onend(e,x,y)
	// 	}
	// }


	var events = 'touchstart,touchmove,touchend,touchcancel,mousedown,mousemove,mouseup,mouseout'.split(',')
	var maxTapInterval = 100;
	var longPressTime = 500;
	var onevent;//{-3: ontouchend, -2:ontouchmove,  -1:ontouchstart, 0:longPress, 1:singleTap,2:doubleTap,n: ntap}
	var touchStart
	var tapCount;
	var tapTimeout;
	var longPressTimeout;
	var moveThreshold = 10;//click 认定的最大滑动距离
	var moveCount = -1;
	var latestX;
	var latestY;
	var startX;
	var startY;
	// var DIRTY_CHILD = 1;
	// var DIRTY_CHILD_REPAINT = 2;
	// var DIRTY_SCROLL = 4;
	// var DIRTY_SELF = 8;
	if(window.matchMedia && window.matchMedia('(pointer:coarse)').matches){
		/*
		 * 1 none，当前设备没有任何除键盘或触控板之外的输入方式
		 * 2 fine，当前设备使用了鼠标来操作
		 * 3 coarse, 表示当前设备至少支持触屏操作，也可能同时支持鼠标
		 */
		events.splice(4);
	}
	var i = events.length;
	while(i--){
		container.addEventListener(events[i],eventHandler,false);
	}
	function removeEvent(events){
		var i = events.length;
		while(i--){
			//console.log('remove event:',events[i])
			container.removeEventListener(events[i],eventHandler,false);
		}
	}

	// function resetAction(action){
	// 	resetEvent(true);
	// 	var oldEvent = onevent;
	// 	onevent  = action;
	// 	return oldEvent;
	// }
}



