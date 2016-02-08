exports.UIList = UIList;
exports.UICard = UICard;
var uibase = require('./uibase')
function UICard(width,height,getValues,getIndex,setStatus){
	uibase.Widget.apply(this,[width,height,this.prepare]);
	this.getValues = getValues;
	this.getIndex = getIndex;
	this.setStatus = setStatus
}

function UIList(width,height,getValues,setStatus){
	uibase.Widget.apply(this,[width,height,uiPainter]);
	this.getValues = getValues;
	this.setStatus = setStatus
	this.supportScroll = true;
}
UIList.prototype = Object.create(uibase.Widget.prototype);
UICard.prototype = Object.create(uibase.Widget.prototype);
UIList.prototype.prepare = function(){
	if(this.template == null){
		this.template = [this.children,this.rangeX,this.rangeY];
		this.children = [];
		this.rangeX =[];
		this.rangeY = [];
		this.repaint()
	}
	this.values = this.getValues();
	var len = this.values.length
	var cellHeight = this.template[0][0].height;
	var width = this.width;
	var dividerHeight = this.dividerHeight || 2;
	var y = 0;
	for(var i=this.children.length;i < len;i++){
		this.add(new ListItem(this,i,width,cellHeight),0,y);
		y+=cellHeight+dividerHeight;
	}
	this.children.length = len;
}

UICard.prototype.prepare = function(){
	//console.log(this.getValues(),this.getIndex())
	this.value = this.getValues()[this.getIndex()||0];
	this.setStatus(this.value);
}
function uiPainter(){
	this.prepare();
}

function ListItem(list,i,width,height){
	uibase.Widget.apply(this,[width,height,itemPainter,itemEvent]);
	this.list = list;
	this.index = i;
	var tmps = list.template;
	this.rangeX = tmps[1];
	this.rangeY = tmps[2];
	tmps = tmps[0].concat();
	var i = tmps.length;
	while(i--){
		(tmps[i] = tmps[i].clone()).parentWidget = this;
	}
	this.children = tmps;
}
ListItem.prototype = Object.create(uibase.Widget.prototype);
ListItem.prototype.prepare = function(){
	var list = this.list;
	//console.log('list index:',this.index)
	list.setStatus(list.values,this.index)
}
function itemPainter(ctx,w,h){
	this.prepare();
}

function itemEvent(type,e,sx,sy,x,y){
	this.prepare()
}



