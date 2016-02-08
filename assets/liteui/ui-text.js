var uibase = require('./uibase');
var config = require('./uiconfig');

exports.TextView = TextView;

function TextView(maxWidth,maxHeight,text,color,font){
	uibase.Widget.apply(this,[maxWidth,maxHeight,textPainter,textEvent]);
	this.text = text;
	this.color = color;
	//console.log('@@@@'+color,this.draw);
	this.font = font || '26px '+config.fontFamily;
	this.patterns = [];
	this.colors = [];
	this.fonts = [];
}

TextView.prototype = Object.create(uibase.Widget.prototype);
TextView.prototype.addPattern = function(keywordPattern ,style){//匹配不同样式

	if(typeof keywordPattern == 'string'){
		var end = keywordPattern.lastIndexOf('/')
		keywordPattern = new RegExp(keywordPattern.slice(1,end),keywordPattern.slice(end+1))
	}
	this.patterns.push(keywordPattern);
	//keywordColor, keywordFont
	var styles  = style.split(';')
	this.colors.push(styles[0]);
	this.fonts.push(styles[1]||this.font);
}
function textEvent(type,e,sx,sy,x,y){
	
}
function textPainter(ctx,width,height){
	//console.log(this.text,this.background)
	if(this.background){
		ctx.fillStyle = this.background;
		ctx.fillRect(0,0,width,height);
	}
	var padding = this.padding || 0;
	var rows = buildTextLines(this.text,this.width-padding*2,this.font,this.patterns,this.fonts);
	var textAlign = this.textAlign;
	var lineHeight = this.lineHeight || this.font.replace(/.*?([\d\.]+)px.*/,'$1')*1.5|0;
	var len = rows.length;
	var y = lineHeight+padding;
	var contentHeight = rows.length * lineHeight+padding*2;
	if(contentHeight!=height){
		if(contentHeight>height){
			this.parentWidget.supportScroll = true;
		}
		if(this.parentWidget.supportScroll){
			this.resize(width,contentHeight);
			//console.log('resize text view:',contentHeight)
			return;
		}
	}
	
	for(var i=0;i<len;i++){
		var line  = rows[i];
		var x = padding;
		if(textAlign == 'center'){
			var w = 0;
			for(var j=0;j<line.length;j+=3){
				w+= line[j+1];
			}
			x += (width-w)/2
		}
		for(var j=0;j<line.length;){
			var patternIndex = line[j++];
			var w = line[j++];
			var text = line[j++];
			
			var font = patternIndex<0?this.font:this.fonts[patternIndex];
			var color = patternIndex<0?this.color:this.colors[patternIndex];
			//console.log(color)
			ctx.font = font;
			ctx.fillStyle = color;
			ctx.fillText(text,x,y);
			x+=w;
		}
		y+=lineHeight
	}
	
}
function buildTextLines(text,width,font,patterns,fonts){
	var patterns = matchPatterns(text,patterns)
	var words = _splitText(text);
	var len = words.length;
	var index = 0;
	var lineWidth =0;
	var line = []
	var rows = [line];
	//var maxLineHeight;
	for(var i=0;i<len;i++){
		var word = words[i];
		var patternIndex = getPatternIndex(patterns,index);
		var font = patternIndex<0?font:fonts[patternIndex]||font
		var w = _measureTexts(word,font);
		var lineEnd = /\n|\r\n/.test(word);
		if(lineEnd || lineWidth+w> width){
			rows.push(line = [])
			lineWidth = 0;
		}
		if(!lineEnd){
			var lastIndex = line.length-1;
			var last = line[lastIndex];
			if(line[lastIndex-2] == patternIndex){
				line[lastIndex-1]+=w;
				//console.log('line width:',line[lastIndex-1],width,font,last.join(''))
				last.push(word) 
			}else{
				if(last){
					line[lastIndex] = last.join()
				}
				line.push(patternIndex,w,[word])
			}
			lineWidth+=w;
		}
		index+=word.length;
	}
	for(var i=rows.length-1;i>=0;i--){
		line=rows[i];
		line.length && line.push(line.pop().join(''))
	}
	return rows;
}

function getPatternIndex(patterns,value){
	for(var i = 0;i<patterns.length;i++){
		var matchs = patterns[i];
		var end = matchs.length-1;
		var start = 0;
		var k = end>>1;
		while(start<end){
			var v = matchs[k];
			if(value>v){
				start = k+1;
			}else if(value<v){
				end = k-1;
			}else{
				return i;//k>>1;
			}
			k = (start+end)>>1;
		}
		
		v = matchs[start];
		if(start ==0){
			if(value>=v){
				//console.log('find keyword:',start,end,[v,value],matchs.length)
				return i;
			}
		} else if((start & 1) ^ (v<value)){
			//console.log('find keyword:',start,end,[v,value],matchs.length)
			return i;
		}
	}
	//console.log(patterns)
	return -1;
}


function matchPatterns(text,patterns){
	var result = [];
	for(var i = 0;i<patterns.length;i++){
		var matches = [];
		var p  =patterns[i];
		var m=p.exec(text);
		if(m){
			matches.push(m.index,p.lastIndex-1)
		}
		if(p.global){
			while(m=p.exec(text)){
				matches.push(m.index,p.lastIndex-1)
			}
		}
		result.push(matches)
	}
	//console.log('matches',result,patterns)
	return result;
}
function _splitText(words){
	return words.match(/[\ud800-\udbff][\udc00-\udfff]|\r\n|[\s\S]/g);
}
function _measureTexts(words,font){
	var ctx = getMeasureContext(font);
	return ctx.measureText(words).width;
}
function getMeasureContext(font){
	var ctx = measureContextMap[font];
	if(!ctx ){
		ctx = document.createElement('canvas');
		ctx.width=ctx.height=0;
		ctx = ctx.getContext('2d');
		ctx.font = font;
		measureContextMap[font] = ctx;
	}
	return ctx;
}
var measureContextMap = {}