
//,
//>>=<<=<>=
//+-&
//*/
//^
//+-%  //前缀后缀运算符
//call
let opss = [
	[','],//0x100
	['<','<=','=','<>','>=','>'],//0x110
	['-','+','&'],//0x120
	['*','/'],//0x130
	['^'],//0x140
	['0-','0+','%'],//0x150
	['()','#','#,']//call,range insect,range join
	//['(',')']
]

let TYPE_ARGS = -1;

let TYPE_VALUE  =0;
let TYPE_REF = 3;
let TYPE_QUTE_START = 0x100 + 2;
let TYPE_QUTE_END =0x100 + 8;
let TYPE_PARAM = 0x200;
let TYPE_NEG = 0x250;
let TYPE_POS = 0x251;
let TYPE_PERCENT = 0x252;

let opMap = [];

for(let i = 0;i<opss.length;i++){
	let ops = opss[i];
	// console.log(opss,i,ops)
	for(let j=0;j<ops.length;j++){
		let type = 0x200+(i<<4)+j;
		let op = ops[j];
		opMap[op] = type;
		opMap[type] = op;
	}
}
opMap[TYPE_QUTE_START] = '('
opMap[TYPE_QUTE_END] = ')'

//<fun1><qute|param2><ref3><const4><op5>
let tokenPattern = /([\w_]+)\s*\(|([\(\)\{\}\,])|(\$?[a-zA-Z]+\$?\d+(?:\:[a-zA-Z]+\d+)?)|([\d\.]+(?:E[\+\-]?\d+)?|(?:"[^"]")+|TRUE|FALSE)|([\+\-\*\/\%\^\&><=]+)|\s+/gi
let oprationPattern = /\%|\+|\-|\=|\*|<>|>=|<=|[<>]|\^|\&/
function parseSimpleConstant(s){
	if(s.indexOf('"')>=0){
		let m,buf=[];
		while(m=/"([^"]*)"/.exec(s)){
			buf.push(m[1]);
		}
		return buf.join('"')
	}else if(/true|false/i.test(s)){
		return /true/i.test(s)
	}else{
		return +s;
	}
	
}
function isRangeJoinPos(result){
	let type = result[result.length-1][0] ;
	return type == TYPE_REF || type == TYPE_QUTE_END;
}
function tokens(el){
	//console.log(el)
	let m;
	var result = [];
	let quteStack = [];//0:qute,1:call,2:array
	while(m = tokenPattern.exec(el)){
		let v ;
		// console.log(m,'@@@');
		let index= m.index;
		for(let i=1;i<=8;i++){
			if(v = m[i]){
				if(i == 1){
					result.push([TYPE_VALUE,v,index]);
					index+=v.length
					quteStack.push(1)
					result.push([opMap['()'],index]);
					result.push([TYPE_QUTE_START,index]);
					result.push([TYPE_ARGS,index])
					result.push([opMap[','],index]);
				}else if(i == 2 ){
					switch(v){
					case '('://正常括弧
						if(isRangeJoinPos(result)){
							result.push([opMap['#'],index]);//集合求交集
						}
						result.push([TYPE_QUTE_START,index]);
						quteStack.push(0)
						break;
					case '{':
						result.push([TYPE_QUTE_START,index]);
						result.push([TYPE_ARGS,index])
						result.push([opMap[','],index]);
						quteStack.push(2)
						break;
					case '}':
					case ')':
						let old = quteStack.pop();
						if( v == '}'){
							if(old != 2){
								throw new Error('qute not match!');
							}
						}
						if(result[result.length-1][0] == opMap[',']){
							result.pop();
						}
						
						result.push([TYPE_QUTE_END,index]);
						break;
					case ',':
						if(!quteStack[quteStack.length-1] ){//==0 || ==null
							result.push([opMap['#,'],index]);//集合求并
						}else{
							result.push([opMap[','],index]);
						}
					}
				}else if(i==3){//ref
					if(isRangeJoinPos(result)){
						result.push([opMap['#'],index]);//集合求交集
					}
					result.push([3,v,index])
				}else if(i == 4){//const
				//	result.push([TYPE_VALUE,+v,index]);
				//}else if(i ==5){
					v = parseSimpleConstant(v);
					result.push([TYPE_VALUE,v,index]);
				}else if(i == 5){//op
					let op = v;
					while(op && (op = op.replace(oprationPattern,(a)=>{
							//区分正负符号和+-符号
							if(a == '%'){//最高优先级   且前面不可能有其他后缀运算符，但是后面可能有其他前缀运算符
								result.push([opMap['%'],index]);
								//result.push([TYPE_VALUE,100,index]);//转化位中值运算符
							}else if(a == '+' || a=='-'){
								let prev = result.length?result[result.length-1][0]:-1
								//console.log(prev)
								if(prev ==-1 || prev >= 0x100  && prev != TYPE_QUTE_END){
									//正负号
									result.push([opMap['0'+a],index]);
								}else{
									result.push([opMap[a],index]);
								}
							}else{
								result.push([opMap[a],index]);
							}
							index += a.length;
							return '';
						})));
				}else{
					throw new Error('unknow token ',v,i,el)
				}
				break;
			}
		}
	}
	return result;
}

//
//=sum(E1:F2,F2*2,2^5,3+1)
//function (){return this.sum(this.$ref('E1:F2'),this.$muti(this.$ref('F2'),2),this.$pow(2,5),this.$plus(3,1))}
export function parse(el){
	console.log(el)
	var ts = tokens(el);
	//console.log(ts.map(t=>opMap[t[0]] || t))
	let rightTokens = right(ts) 
	return toTree(rightTokens);
}
export function evaluate(tree,ctx){
	switch(tree[0]){
		case TYPE_VALUE:
			return tree[1];
		case TYPE_REF:
			return ctx.getRefValue(ctx);
		case TYPE_ARGS:
			return [];
		case TYPE_PARAM:
			let arg1 = evaluate(tree[1],ctx);
			let arg2 = evaluate(tree[2],ctx);
			arg1.push(arg2);
			return arg1;


	}
}
function toTree(rightTokens){
	var stack = [];
    for(var i=0;i<rightTokens.length;i++){
        var item = rightTokens[i]
        var type = item[0];
        switch(type){
            case TYPE_REF:
            case TYPE_VALUE:
            case TYPE_ARGS:
                stack.push(item);
                break;
            default://OP
                if(TYPE_NEG == type || TYPE_POS == type || type == TYPE_PERCENT){//一个操作树
                	var arg1 = stack.pop();
                	stack.push([type,arg1]);
                }else{//两个操作数
                    var arg2 = stack.pop();
                    var arg1 = stack.pop();
                    stack.push([type,arg1,arg2])
                }
        }
    }
    console.log(JSON.stringify(stack[0]))
    return stack[0];
}
function stringifyItem(item){
	return opMap[item[0]] || item
}
// 将中序表达式转换为右序表达式
function right(tokens) {
	var rightStack = [];
	var buffer = [];

	for (var i = 0;i<tokens.length;i++) {
		var item = tokens[i];
		var type = item[0];
		// console.log(buffer.map(stringifyItem));
		// console.log('rightStack',rightStack.map(stringifyItem))
		if (type >= 0x100) {//op
			if (buffer.length == 0) {
				buffer.push(item);
			} else if (type == TYPE_QUTE_START) {
				buffer.push(item);
			} else if (type == TYPE_QUTE_END) {
				while (true) {
					var operator = buffer.pop();
					if (operator[0] == TYPE_QUTE_START) {
						break;
					}
					rightStack.push(operator);
				}
			} else {
				//console.log('#2',type)
				while (buffer.length
						&& rightEnd(type, buffer[buffer.length-1][0])) {
					var operator = buffer.pop();
					rightStack.push( operator);
				}
				buffer.push(item);
			}
		} else if(type == TYPE_REF || type == TYPE_VALUE || type == TYPE_ARGS) {
			rightStack.push( item);
		}else{
			throw new Error('unsupport values:')
		}
	}
	while (buffer.length !=0) {
		var operator = buffer.pop();
		rightStack.push( operator);
	}
	return rightStack;
}

/**
 */
function rightEnd(currentType, previousType) {
	var previousPriority = (previousType)>>4;
	var currentPriority = (currentType)>>4;
	//if(currentType == TYPE_PARAM && previousType == TYPE_PARAM) return false;
	return currentPriority <= previousPriority;
}

console.log(opMap)
// console.log(parse("1+2*3+sum(1,2)"))
console.log(parse("SUM(A1:B1,2,SUM( 3, 1+5,1% ) )"))