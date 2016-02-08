var uibase = require('./uibase');
var config = require('./uiconfig');

exports.UIPicker = UIPicker;
function UIPicker(width,height,options,index,callback){
	//Widget
	uibase.Widget.apply(this,[width,height,pickerPainter,pickerEvent]);
	this.options = options;
	this.offset = index;
	if(callback){
		this.onchange = callback;
	}
}

UIPicker.prototype = Object.create(uibase.Widget.prototype);
UIPicker.prototype.getIndex=function(){
	var len = this.options.length
	return (len+Math.round(this.offset))%len
}
UIPicker.prototype.onchange = function(newIndex,oldIndex){}
UIPicker.prototype.getValue=function(){
	return this.options[this.getIndex()]
}
UIPicker.prototype.roll = function(dif){
	var idx = this.getIndex();
	var len = this.options.length;
	var idx2=(idx+dif)%len;
	this.offset = idx2 = idx2<0?idx2+len:idx2;
	//console.log('do roll:',idx,dif,idx2)
	this.onchange(idx2,idx)
	this.repaint();
	return Math.abs(idx2-idx)>len-2
}
UIPicker.prototype.drawOption = function(ctx,idx,cx,cy,offsetRate){
	var fontRate = .2 - offsetRate*.1
	ctx.font = (this.height * fontRate | 0)+'px '+config.fontFamily;
	ctx.globalAlpha = Math.pow( Math.min(1 - offsetRate+.1,1),3);
	ctx.fillText(this.options[idx],cx,cy)
}
function pickerPainter(ctx,w,h){
	var cellHeight = h/3;
	var lw = config.lineWidth;
	ctx.lineWidth = lw;
	
	ctx.fillStyle='#000'
	ctx.strokeStyle='#4cd4bc'
	//ctx.strokeRect(0,0,w,h)
	ctx.beginPath();
	ctx.lineCap="round";
	ctx.moveTo(lw,cellHeight);
	ctx.lineTo(w-lw,cellHeight)
	ctx.moveTo(lw,cellHeight*2);
	ctx.lineTo(w-lw,cellHeight*2);
	ctx.stroke();
	
	var len = this.options.length;
	var i = -2;
	var y0 = -cellHeight -this.offset*cellHeight;
	
	ctx.textBaseline ='middle'
	ctx.textAlign= 'center';
	
	do{
		if(y0>-cellHeight){
			if(y0>h){
				break;
			}
			var offsetRate = Math.abs(y0 - cellHeight)/h;
			var idx = (i+len)%len;
			this.drawOption(ctx,idx,w/2,y0+cellHeight/2,offsetRate)
		}
		y0+=cellHeight;
	}while(i++<=len)
}
function pickerEvent(type,e,sx,sy,x,y){
	if(type == -2){
		var idx = this.getIndex();
		var ch = this.height/3;
		var dy = (y - this.previousY)/ch;
		var offset = this.offset;
		var len = this.options.length;
		if(offset>len-1 || offset<0){
			if(offset > len || offset<-1){
				offset = (offset + len) % len;
			}
			dy/=2;
		}else{
			dy*=Math.log(Math.abs(y-this.height/2)/ch/10+1)*10
		}
		
		this.offset = offset - dy;//Math.max(0,Math.min(offset,this.options.length-1))
		var idx2 = this.getIndex();
		idx2!=idx && this.onchange(idx2,idx);
		this.repaint();
	}else if(type == -3){
		this.offset = this.getIndex();
		this.repaint();
	}
}