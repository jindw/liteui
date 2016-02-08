exports.registor = registor;
exports.load = loadXUL;
var xmldom = require('xmldom')
var uibase = require('./uibase')
var uitext = require('./ui-text')
var uilist = require('./ui-list')
var width;
var height;
var widgetFactoryMap = [];

function registor(tagName,factory){
	widgetFactoryMap[tagName] = factory
}

function loadXUL(path,args,w,h){
	width = w;
	height = h;
	loadURL(path,function(xml){
		xulLoaded(xml,args)
	})
}

function checkDynamic(widget){
	if(widget.prepare){
		widget.prepare()
	}
	//console.log('check dynamic',widget._dynamic)
	var checkChild = true;
	var dyn = widget._dynamic;
	if(dyn){
		for(var n in dyn){
			var v = dyn[n]();
			if(widget[n] != v){
				//if(n == 'background')console.log('dyn change:',n,widget[n],v)
				widget[n] = v;
				//if(n == 'background')console.log('dyn change2:',n,widget)
				widget.repaint();
			}
		}
	}
	var chs = widget.children;
	var len = chs.length;
	for(var i=0;i<len;i++){
		checkDynamic(chs[i])
	}
}

function xulLoaded(xml,args){
	var doc = new xmldom.DOMParser().parseFromString(xml);
	var root = doc.documentElement;
	//var keys = 'a,b,c,d'.split(',');
	//var values = [{title:'111',value:'aaaaa'},{title:'22',value:'bbb'},{title:'33',value:'ccc'},{title:'44',value:'dddd'},{},{},{}]
	var model = doc.model = new ModelFactory(root.getAttribute('arguments'),args);
	root = createWidget(root,width,height);
	checkDynamic(root)
	root.attach();
}
function ModelFactory(args,values){
	//this.fnCache = {};
	this.idCache = {};
	this.vars = args.split(/[^\w\$]+/);
	this.values =values;
	this.inc =1;
}
ModelFactory.prototype.getCallback = function(){
	if(!this.impl){
		var buf = ['return function(){switch(+this){'];
		for(var n in this.idCache){
			buf.push('case ',this.idCache[n],':' ,'return ',n,';\r\n')
		}
		buf.push('}}')
		//console.log(this.vars+buf.join(''))
		var scope = new Function(this.vars,buf.join(''));
		this.impl = scope.apply(null,this.values)
		
		//console.log(scope,this.values,this.impl.call(1))
	}
	//console.log(this.impl+'')
	return this.impl;
}
function addVarable(node){
	var doc = node.ownerDocument;
	var vars = doc.model.vars;
	var i = arguments.length;
	while(i-->1){
		var varName = arguments[i];
		vars.indexOf(varName)<0 && vars.push(varName)
	}
}
function createExpression(node,el){
	var doc = node.ownerDocument;
	//console.log('expression',el)
	var model = doc.model;
	var idCache = model.idCache;
	if(el in idCache){
		var inc = idCache[el];
	}else{
		var inc = model.inc++;
		idCache[el] = inc;
	}
	return function(){
		return model.getCallback().apply(inc,arguments)
	};
}
function registorDynamic(node,widget){
	var len = arguments.length;
	while(len-->2){
		var p = arguments[len];
		var v = widget[p];
		var el = parseEL(node,v);
		if(el){
			var dyn = widget._dynamic;
			if(!dyn){
				dyn = widget._dynamic = {};
			}
			dyn[p] = el;
		}
	}
}
function parseEL(node,v,forceEL){
	var el = v.replace(/^\s*\$\{([\s\S]+)\}\s*$/,'$1');
	if(forceEL || el!=v){
		return createExpression(node,el.replace(/\bfor\.(index|lastIndex)/g,'_for_$1'));
	}
}
function createWidget(dom,width,height){
	var factory = widgetFactoryMap[dom.localName] || defaultFactory;
	return factory(dom,width,height)
}

function defaultFactory(el,width,height){
	width = computeSize(el.getAttribute('width'),width,width);
	height = computeSize(el.getAttribute('height'),height,height);
	//console.log(width,height)
	var bgColor = el.getAttribute('background');
	var widget = new uibase.Widget(width,height,bgColor);
	appendChildDefault(widget,el,width,height);
	return widget;
}
registor('Layout',defaultFactory)
registor('List',function(el,width,height){
	width = computeSize(el.getAttribute('width'),width);
	height = computeSize(el.getAttribute('height'),height);
	var varName = el.getAttribute('var');
	var valueEL = parseEL(el,el.getAttribute('value'),true)
	var statusEL = parseEL(el,varName+'=arguments[0][_for_index = arguments[1]];',true);
	var widget = new uilist.UIList(width,height,valueEL,statusEL);
	addVarable(el,varName)
	appendChildDefault(widget,el,width,height);
	return widget;
})
registor('Card',function(el,width,height){
	width = computeSize(el.getAttribute('width'),width);
	height = computeSize(el.getAttribute('height'),height);
	var indexName = el.getAttribute('index').replace(/^\$\{|\}$/g,'');
	var varName = el.getAttribute('var');
	var indexEL = parseEL(el,indexName,true)
	//console.log(indexName,indexEL)
	var valueEL = parseEL(el,el.getAttribute('value'),true)
	var statusEL = parseEL(el,varName+'=arguments[0];',true);
	var widget = new uilist.UICard(width,height,valueEL,indexEL,statusEL);
	addVarable(el,indexName,varName)
	appendChildDefault(widget,el,width,height);
	return widget;
	
})
registor('Button',function(el){
	var widget = textFactory.apply(this,arguments);
	return widget;
})
registor('Text',textFactory)
function textFactory(el,width,height){
	width = computeSize(el.getAttribute('width'),width);
	height = computeSize(el.getAttribute('height'),height);
	var bgColor = el.getAttribute('background');
	var action = el.getAttribute('action');
	var textColor = el.getAttribute('color');
	var textValue = el.getAttribute('value');
	var widget = new uitext.TextView(width,height,textValue,textColor);
	var keywordPattern = el.getAttribute('keywordPattern');
	if(keywordPattern){
		widget.addPattern(keywordPattern,el.getAttribute('keywordStyle'))
	}
	if(action){
		action = parseEL(el,action,true);
		widget.event = function(type){
			if(type == 1){
				action();
				var p = this;
				while(p.parentWidget){
					p = p.parentWidget
				}
				checkDynamic(p);
			}
		}
	}
	widget.padding = computeSize(el.getAttribute('padding'),width);
	widget.textAlign= el.getAttribute('textAlign')
	widget.background = bgColor;
	registorDynamic(el,widget,'text','color','background');
	
	
	return widget;
}
function appendChildDefault(parentWidget,el,width,height){
	var el = el.firstChild;
	while(el){
		if(el.nodeType == 1){
			var widget = createWidget(el,width,height);
			var l = computeSize(el.getAttribute('left'),width,0);
			var t = computeSize(el.getAttribute('top'),height,0);
			parentWidget.add(widget,l && l,t)
		}
		el = el.nextSibling;
	}
}

function computeSize(attr,size,defualtValue){
	if(attr.slice(-1) == '%'){
		return size*attr.slice(0,-1)/100 | 0;
	}else if(attr){
		return attr * 1|0
	}else{
		return defualtValue==null? -2:defualtValue;//wrap content
	}
}
function loadURL(url,callback){
	if(/^</.test(url)){
		return callback(url);
	}
	var xhr = new XMLHttpRequest();
	var headers = {"Accept":"'*/*'"};
	xhr.onreadystatechange = function(){
		var state = xhr.readyState;
		if(state == 4){
			console.log('complete url:',url)
			var data = xhr.responseText;
			var status = data!=null && xhr.status;
			var result = status ?status == 304 || status >= 200 && status < 300 : null;
			if(result){
				result = data
			}else{
				result = "<error>"+data.replace(/</g,'&lt;')+"</error>";
			}
			xhr.onreadystatechange = Function.prototype;
			callback(result)
		}
	};
	xhr.open("GET",url,true);
	for(var n in headers){
		xhr.setRequestHeader(n,headers[n]);
	}
	xhr.send('');
}