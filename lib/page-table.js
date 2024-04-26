import {Page} from "./page.js";
// import {Draw} from "./draw.js";
import {BaseData,RawTable} from "./model.js";


export class TablePage extends Page{
	constructor(container,data){
		super(container);
		let canvas = this.canvas = container.firstChild;
		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;
		this.data = data;
		data.config.fixCloumn = 3;
		let headers = data.headers;
		let lineHeight = data.config.lineHeight;
		let contentWidth = headers.reduce((s,h)=>s+h.width,0);
		let contentHeight = (data.length +1) *lineHeight;
		let fixCloumn = data.config.fixCloumn ;
		let offsetX = headers.slice(0,fixCloumn).reduce((s,h)=>s+h.width,0);

 		this.setScrollRect(offsetX,lineHeight,0,0,contentWidth,contentHeight);
	}
 	event(type,x,y,event,startX,startY){
 		
 		super.event(type,x,y,event,startX,startY);
 		

 	}
 	onclick(x,y,event){

 		this.clearEditor();

 		let info = findCellInfo(this,x,y);
 		let fixWidth = info.fixWidth
 		let rect = info.rect;
 		let left = rect.left ;
 		if(info.fixWidth && left>=fixWidth){
 			left -= this.scrollLeft;
 			if(left<fixWidth){
 				this.onscroll(this.scrollLeft-(info.fixWidth-left)-4,this.scrollTop);
 				left = fixWidth;
 			}
 		}

 		var inputValue = document.createElement('input');
 		inputValue.type="number"
 		inputValue.value = info.value;
 		inputValue.style.cssText="position:absolute;text-align:right;left:"+left+'px;top:'+(rect.top-this.scrollTop)+'px;width:'+rect.width+'px;height:'+rect.height+'px;'
 		this.editor.container.appendChild(inputValue);



 		inputValue.focus();inputValue.select();


 		this.editor.clear = ()=>{
 			if(this.editor.clear){
 				this.editor.clear=null;
				if(info.value != inputValue.value){
	 				info.value = inputValue.value
		 			this.data.setData(info.row,info.col,inputValue.value);
		 			this.repainter();
		 		}
		 		

		 		this.editor.container.removeChild(inputValue);
		 		
	 		}
 		}
 		inputValue.onblur = ()=>{
 			if(this.editor.clear){
 				this.editor.clear();
 			}
 		}
 		
 		//console.log(info,left)

 	}
 	clearEditor(){
 		if(this.editor.clear){
 			this.editor.clear();
 		}
 	}

 	ondblclick(x,y,enent){
 		let info = findCellInfo(this,x,y);
 		let rowId = info.row;
 		this.data.pushRow(rowId,[this.data.createId()])
 		this.repainter();
 		console.log(this.data.length)

 	}
	paint(ctx,realCanvas){
		let scrollPaint = this.scrollPaint;
		this.scrollPaint = null;
		if(scrollPaint ){
			scrollPaint(ctx,this,realCanvas);
		}else{
			drawData(ctx,this.data,this.scrollLeft,this.scrollTop,0)
		}
	}
	onscroll(scrollLeft,scrollTop,e){
		//clearEditor();
		this.clearEditor();
		if(this.scrollLeft === scrollLeft && Math.random()>0){
			let diff = scrollTop - this.scrollTop;//下滑为正
			this.scrollPaint = (ctx,table,realCanvas)=>{
				drawScroll(ctx,table,realCanvas,diff);
			}
			super.onscroll(scrollLeft,scrollTop,e);

		}else{
			super.onscroll(scrollLeft,scrollTop,e);
		}
 	}

}
function findCellInfo(page,x,y){
	let data = page.data;
	let config = data.config;
	let headers = data.headers;
	let lineHeight = config.lineHeight;
	let fixCloumn = config.fixCloumn;
	let fixWidth =0;
	let left = handerWidth;
	let rowY = (y + page.scrollTop)/lineHeight |0
	let h ;
	if(x<handerWidth){
		return null;
	}

	for(let  i=0;i<headers.length && x>=left;i++){
		h = headers[i];

		if(i == fixCloumn){
			x+=page.scrollLeft;
			fixWidth = left;
		}
		if(x-left<h.width){
			break;
		}
		left += h.width;
	}
	let y2 = data.data.getRowIndex(rowY-1);

	let row = data.data.rowIds[y2];
	var value = data.data.rows[y2][h.id];

	return {
		value,

		row:row,
		col:h,
		fixWidth:fixWidth,
		rect:{left:left,top:rowY*lineHeight,width:h.width,height:lineHeight}
	}
	

}

function drawScroll(ctx,table,realCanvas,diff){
	//var canvas = ctx.canvas;
	//drawData(ctx,table.data,table.scrollLeft,table.scrollTop,diff)

	let rowHeight = table.data.config.lineHeight;
	// ctx.save();
	// ctx.rect(0,rowHeight,realCanvas.width,realCanvas.height-rowHeight);
	// // console.log(0,rowHeight,realCanvas.width,realCanvas.height-rowHeight)
	// ctx.clip();
	let width = realCanvas.width;
	let height =realCanvas.height;
	let copyHeight = height-rowHeight-Math.abs(diff);

	ctx.save();
		ctx.beginPath();
		if(diff >0){//上滑
			ctx.drawImage(realCanvas,0,rowHeight +diff,width,copyHeight,0,rowHeight,width,copyHeight);
			//补充绘制下边缘
			ctx.rect(0,height-diff,width,diff);

			
		}else{
			ctx.drawImage(realCanvas,0,rowHeight+1      , width,copyHeight-1, 0 ,rowHeight-diff+1     ,width,copyHeight-1);
			//补充绘制上边缘
			ctx.rect(0,rowHeight,width,-diff+1);
			
		}
	try{
		ctx.closePath();
		ctx.clip();
		drawData(ctx,table.data,table.scrollLeft,table.scrollTop,diff);
	}finally{
		ctx.restore();
	}

		
}



function drawData(ctx,data,scrollLeft,scrollTop,diff =0){
	//let draw = new Draw(canvas);
	// console.log('draw:',scrollLeft,scrollTop)
	// // var m = new RawTable()
	let canvas = ctx.canvas;
	let height = canvas.height;
	let count = data.length;
	//ctx.clear();
	try{
		ctx.save();
		ctx.fillStyle='white';
		ctx.beginPath();
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle='black';

		let rowHeight = data.config.lineHeight;
		let i = (scrollTop/rowHeight) | 0;
		let y = rowHeight * i - scrollTop;
		let headers = data.headers;
		ctx.font =("25px Arial")
		ctx.translate(1,rowHeight)

		let view_height = canvas.height-rowHeight;
		let fixCloumn = data.config.fixCloumn;


		for(;i<count && y<view_height;i++){
			let y2 = y+rowHeight;
			if(y2>0 ){
				//ctx.strokeRect(0,y,ctx.width,cellHeight);
				if(diff>0){//上滑
					
					if(y2<view_height-diff){
						y=y2;
						continue;
					}
				}else if(diff<0){
					if(y>-diff){
						break;
					}
				}

				let handerWidth = drawHander(ctx,y,rowHeight,i);
				ctx.translate(handerWidth,0)
				drawRow(data,ctx,scrollLeft,y,fixCloumn,headers,data.getRow(i),rowHeight)
				ctx.translate(-handerWidth,0)
			}
			y=y2;
		}
		if(!diff){
			ctx.font =("25px Arial")
			let handerWidth = drawHander(ctx,-rowHeight,rowHeight);
			ctx.translate(handerWidth,-rowHeight)
			drawHeader(ctx,scrollLeft,fixCloumn,headers,rowHeight);
		}
	}finally{
		// ctx.flush();
		ctx.restore();
	}
}

let handerWidth = 85;
function drawHander(ctx,y,rowHeight,i){
	ctx.save();
	try{
		ctx.fillStyle = '#CCC';
		ctx.fillRect(0,y,handerWidth,rowHeight);
		ctx.strokeStyle = '#000'
		ctx.fillStyle = '#000'
		if(i != null){
			ctx.fillText(i,handerWidth-ctx.measureText(i).width-rowHeight-10,y+rowHeight-3)
		}
		ctx.beginPath();
		ctx.moveTo(0,y+rowHeight);
		ctx.lineTo(handerWidth,y+rowHeight);

		ctx.stroke();

		ctx.strokeRect(55,y+5,rowHeight-10,rowHeight-10);
	}finally{
		ctx.restore();
	}
	return handerWidth;

}
function drawHeader(ctx,scrollLeft,fixCloumn,headers,rowHeight){
	let width = headers.reduce((s,h)=>s+h.width,0);
	ctx.fillStyle = '#ddd';
	let x =width-scrollLeft;
	let y = 0;
	let x2 = 0;
	ctx.fillRect(0,y,width,rowHeight)
	ctx.fillStyle = '#D0D';
	for (var i = headers.length-1; i >=0  ; i--) {
		let h = headers[i]
		if(i>=fixCloumn){
			x-=h.width;
			ctx.strokeRect(x,y,h.width,rowHeight);
			
			let offsetX = (h.width-rowHeight)>>1;
			ctx.fillText(number2alpha(i),x+offsetX,y+rowHeight-3)
			
		}else{
			if(x2 == 0){
				x2 = headers.slice(0,fixCloumn).reduce((s,h)=>s+h.width,0);
				ctx.fillStyle = '#DDD';

				ctx.fillRect(0,0,x2,rowHeight);
			}
			x2 -=h.width;
			ctx.strokeRect(x2,y,h.width,rowHeight);
			ctx.fillStyle = '#D0D';
			let offsetX = (h.width-rowHeight)>>1;
			ctx.fillText(number2alpha(i),x2+offsetX,y+rowHeight-3)
		}
		
	}
}
function number2alpha(i){
	return i.toString(26).split('').map(a=>String.fromCharCode(parseInt(a,26)+65)).join('');
}
function drawRow(data,ctx,scrollLeft,y,fixCloumn,headers,row,rowHeight){
	let width = headers.reduce((s,h)=>s+h.width,0);
	let x =  width-scrollLeft;
	let x2 = 0;
	ctx.save();
	for (var i = headers.length-1; i >=0  ; i--) {
		let h = headers[i]
		let v = row[h.id];
		if(v == null){
			v = "";
		}else if(typeof v == 'object'){
			if(v.f){
				v = data.caculate(v,row,h);
			}else if(v.v){
				v - v.v;
			}
		}

		if(i>=fixCloumn){
			x-=h.width;
			ctx.strokeRect(x,y,h.width,rowHeight);
			ctx.fillText(v,x+h.width-ctx.measureText(v).width-3,y+rowHeight-3)
			
		}else{
			if(x2 == 0){
				x2 = headers.slice(0,fixCloumn).reduce((s,h)=>s+h.width,0);
				ctx.fillStyle = '#eee';

				ctx.fillRect(0,y,x2,rowHeight);
			}
			x2 -=h.width;
			ctx.strokeRect(x2,y,h.width,rowHeight);
			ctx.fillStyle = '#333';
			let offsetX = (h.width-rowHeight)>>1;
			ctx.fillText(v,x2+h.width-ctx.measureText(v).width-3,y+rowHeight-3)
		}
		
	}
	ctx.restore();

}


