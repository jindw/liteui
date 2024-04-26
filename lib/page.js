import {initPainter,initEvent} from "./page-init.js";
/*
 * page 对应一个独立的canvas，一个独立的事件源头
 */

 export class Page{
 	constructor(container){
 		this.container = container;
 		container.style.padding = '0';
 		container.style.margin = '0';

//container.onmousemove = (e)=>console.log(1,e)
 		//super(null,el.clientWidth,el.clientHeight);
 		this.repainter = initPainter(this,()=>this.paint());
 		initEvent(this,(type,x,y,event,startX,startY)=>{
 			this.event.call(this,type,x,y,event,startX,startY);
 		});
 		
 	}
 	paint(ctx){

 	}
 	event(type,x,y,event,startX,startY){
 		//super.event(type,x,y,event,startX,startY);
 		switch(type){
 			case 1:
 			if(this.onclick){
 				this.onclick(x,y,event);
 			}break;
 			case 2:
 			if(this.ondblclick){
 				this.ondblclick(x,y,event);
 			}break;
 			case 0:
			if(this.onlongclick){
 				this.onlongclick(x,y,event);
 			}break;
 			case -1:
 			if(this.onmousedown){
 				this.onmousedown(x,y,event);
 			}break;
 			case -2:
 			if(this.onmousemove){
 				this.onmousemove(x,y,event,fromX,fromY);
 			}break;
 			case -3:
 			if(this.onmouseend){
 				this.onmouseend(x,y,event,fromX,fromY);
 			}break;

 		}

 	}
 	setScrollRect(left,top,right,bottom,width,height){
 		let mock = this.scrollMock || (this.scrollMock = new ScrollMock(this));
 		mock.update.apply(mock,arguments)

 	}
 	onscroll(scrollLeft,scrollTop,e){
 		//alert([scrollLeft,scrollTop,e])
 		//let ctx = this.container.firstChild.getContext('2d');
 		// if(!this.initRect){
 		// 	this.initRect = 1;
 		// 	setTimeout(()=>{
 		// 		ctx.rect(10,10,200,100);
 		// 		ctx.clip();
 		// 	},1000)
 		// }
 		if(this.scrollMock){
 			this.scrollMock.syncScroll(scrollLeft,scrollTop)
 		}
 		
 		this.scrollTop = scrollTop;
 		this.scrollLeft = scrollLeft;
 		this.repainter();
 		// this.pout = this.pout || setTimeout(()=>{
 		// 	this.repainter();
 		// 	this.pout = 0;
 		// },16)
 		
 	}
 }

 export class ScrollMock{
 	constructor(page){
 		this.page = page;
		var scroll_view = document.createElement('div');
		var slider_view = document.createElement('div');
		scroll_view.style.cssText = "position:absolute;overflow:scroll;" //pointer-events: none  background:rgba(255,255,255,.2)
		slider_view.style.cssText = "position:absolute;" //pointer-events: none
		scroll_view.appendChild(slider_view);
		this.view = scroll_view;
		scroll_view.addEventListener('scroll',(e)=>{
			page.onscroll(scroll_view.scrollLeft*this.scaleX,scroll_view.scrollTop,e);
		})
 	}
 	syncScroll(scrollLeft,scrollTop){
 		let left = this.view.scrollLeft,top = this.view.scrollTop;
 		let scroll ;
 		if((left*this.scaleX | 0) != (scrollLeft|0)){
			left = scrollLeft/this.scaleX;
			scroll = true;
 		}
 		if((top | 0) != (scrollTop|0)){
			top =  scrollTop;
			scroll = true;
 		}
 		scroll && this.view.scrollTo(left,top)

 	}
 	update(left,top,right,bottom,width,height){
 		let container = this.page.container;
 		this.scaleX =((container.clientWidth-left-right)/ container.clientWidth) || 1;
 		this.scaleY =1;
 		container.appendChild(this.view);
 		let style = this.view.style;
 		let slider = this.view.firstChild;
 		style.left = 0+'px';
 		style.top = top+'px';
 		style.width = container.clientWidth +'px';
 		style.height = container.clientHeight - top - bottom+'px';

 		slider.style.width = width+'px';
 		slider.style.height = height+'px';
 	}
 }

