import {binSearch,sortedSetAdd} from 'util.js';
export {BaseData}
class DataType{
	constructor(name){
		this.name = name;
	}
}
class TextType extends DataType{
	constructor(){
		super('text')
	}
}
class NumberType extends DataType{
	constructor(){
		super('number')
	}
}


export class DataStep{
	//add/remove col/row,setData
	constructor(op,data,row,cell){
		this.op = op;//remove:0,add:1,change:2, pushrow: 3;   addRange:4,removeRange:5,changeRange:6
		this.data = data;
		this.rowId = rowId;
		this.col = col;
	}
	apply(data){
		switch(this.op){//taStep(this.op,oldValue,this.rowId,this.col);

			case 0://remove row?col
			if(this.col){
				this.data.removeColumn(this.col);
				return new DataStep(1,null,null,this.col);
			}else{
				let row = this.data.removeRow(this.rowId,this.data);//flag delete  row == null
				return new DataStep(1,row,this.rowId,null)
			}
			case 1://add cell? coll
			if(this.col){
				this.data.addColumn(this.col);//data :index
				return new DataStep(0,null,null,this.col);//remove col？？
				//where? 
			}else{
				this.data.addRow(this.rowId,this.data);//data: row data
				return new DataStep(0,null,this.rowId,null);
			}
			case 2:// change cell
			let oldValue = this.data.setData(this.rowId,this.col,this.data);
			return new Da
			case 3://insert row
				this.data.pushRow(this.rowId,this.data);//data: offset
				return new DataStep(0,this.rowId,this.data);

			case 4://addRange
				let oldData = this.data.addRange(this.data);
				return new DataStep(4,oldData)


		}
	}
}
export class PositionStep{
	/**
	 * dir 0:row,1,col,fromId,afterTargetId,beforeTargetId(2选1)
	 */
	constructor(data,dir,fromId,afterTargetId,beforeTargetId){
		this.id = data.createId();
		this.dir = dir;
		this.fromId = fromId;
		this.afterTargetId = afterTargetId;
		this.beforeTargetId = beforeTargetId;
		this.enable = true;
	}
	apply(data){
		this.data.addPositionStep(this);
		return new ReversePositionStep(data.createId(),this);
	}
}
export class ReversePositionStep{
	constructor(id,target){
		this.id = id;
		this.target = target;
	}
	apply(data){
		this.data.addPositionStep(this);
		return new ReversePositionStep(data.createId(),this.target);
	}
}
function cleanPositionSteps(positionSteps,dir){
	return positionSteps.filter(p => p.enable && p.dir === dir)
}

class BaseData{
	constructor(headers,baseTime,uid){
		this.baseTime = baseTime || new Date;
		this.uid = (uid || +new Date()) & 0xffff;
		this._headers = headers|| [];
		//sorted id
		this.rowIds = [];
		//sorted removed ids
		this.deletedRowIds = [];
		//sorted data
		this.rows= [];
		//TODO: 数据便跟需要同步的视图集合
		this.dataViews = [];
		this.positionSteps = [];
		this.latestId = 0;
		this.rangeManager = new RangeManager(this,[]);
		this.eventProxy = new DataEventProxy([].concat(this.dataViews,this.rangeManager))
	}

	createId(){
		let id = +new Date()-(this.baseTime);
		let latestId  = this.latestId ;
		if(id<= latestId){
			id = latestId +1;
		}
		this.latestId = id;
		return (( id)<< 14) + this.uid;
	}
	createColumn(label,type){
		return {
			id:this.createId(),
			label:label,
			type:type || new TextType(),
			deleted:false
		};
	}
	addRow(idy,row){
		//check rows;
		idy = idy || this.createId();
		row = row || {};
		//处理协同问题,排序问题
		let deletedRowIds = this.deletedRowIds;
		let deletedPos = deletedRowIds && deletedRowIds.indexOf(idy);
		if(deletedPos>=0){
			deletedRowIds.splice(deletedPos,1);
		}else{
			let  p = sortedSetAdd(this.rowIds,idy);
			if(p>=0){
				this.rows.splice(p,0,row);
			}else{
				throw new Error('invalid data status');
			}
		}
		this.eventProxy.onRowAdded(this,idy,row)
		// return idy;
	}
	addColumn(col){
		//TODO: 处理删除的列
		let _headers = this._headers;
		let oldI = _headers.indexOf(col);
		if(oldI>=0){
			col.deleted = false;//恢复数据
		}else{
			_headers.push(col);
			//这一步很重要，确保并发有序
			if(_headers.length>1 && _headers[_headers.length-2].id >=col.id){
				_headers.sort((a,b)=>a.id-b.id);
			}
		}
		this.eventProxy.onColumnAdded(this,col);
	}

	addPositionStep(step){
		let positionSteps = this.positionSteps;
		positionSteps.push(step);
		if(step.target){
			step.target.enable = !step.target.enable;
			//reset
		}
		if(positionSteps.length>1 && positionSteps[positionSteps.length-2].id >step.id){
			positionSteps.sort((a,b)=>a.id-b.id);
			//reset
		}else{
			//diff update
		}
	}

	pushRow(idy,tailIds){
		if(tailIds.length>0){
			let offset = tailIds.length
			let fromY = this.rowIds.indexOf(idy);
			if(fromY >=0){
				let len = this.rows.length;
				let args = [fromY,0];
				for(let count = offset;count>0;count--){
					args.push({});
				}
				this.rowIds.push.apply(this.rowIds,tailIds)
				this.rows.splice.apply(this.rows,args)
			}else{
				throw Error('idy not found')
			}
			this.eventProxy.onRowPush(this,idy,tailIds);

		}
	}
	addRange(range){
		this.rangeManager.addRange(range);
	}
	removeRow(idy,count =1){
		let i = this.rowIds.indexOf(idy);
		if(i>=0){

			let deletedRowIds = this.deletedRowIds;
			
			// if(deletedRowIds){
				let i2 = i;
				while(count >0){

					let id = this.rowIds[i2];
					let di = deletedRowIds.indexOf(id);

					if(di<0){
						sortedSetAdd(deletedRowIds,idy);
						this.eventProxy.onRowRemoved(this,id,this.rows[i2]);
						count--;
					}else if(i == i2){
						throw new Error('deleted ')
					}
					i2++;
				}
			// }else{
			// 	this.rowIds.splice(i,count);
			// 	let removedRows = this.rows.splice(i,count);
			// 	this.eventProxy.onRowRemoved(this,idy,removedRows[i]);
			// }
		}
	}
	removeColumn(col){
		let i = this._headers.indexOf(col);
		if(i>=0 && !col.deleted){
			col.deleted = true;
			this.eventProxy.onColumnRemoved(this,col);
		}
	}
	getRowIndex(offset){
		let rowIds = this.rowIds;
		let delIds = this. deletedRowIds ;
		let id = rowIds [offset];
		if(delIds.length && delIds[0]<=id){//offset 内有删除项
			let di = binSearch(delIds,id);//di [0~dlen] || 
			let skip = di>=0? (di+1):-di-1;
			let sfrom = offset+1;
			let dfrom = skip;
			if(dfrom>=delIds.length){
				sfrom += skip;
				skip = 0;
			}
			while(sfrom < rowIds.length  && skip>0){
				if(rowIds[sfrom]<delIds[dfrom]){   //只能是 <=  ，不可能>
					skip--;
					sfrom++;
				}else if(rowIds[sfrom] == delIds[dfrom]){
					sfrom++;
					dfrom++;
					if(dfrom>=delIds.length ){//还没跳完。delIds 用完了
						sfrom += skip;
						break;
					}
				}else{
					throw new Error('invalid deletedRowIds')
				}
			}
			
			if(sfrom > rowIds.length){
				throw new Error('offset overrange'+JSON.stringify({sfrom,dfrom,del:delIds.length,r:rowIds.length}))
				//sfrom = rowIds.length-1;
			}
			return sfrom-1;
		}else{
			return offset;
		}
		//return this.rows[offset];
	}

	setData(idy,col,data){
		let yi = this.rowIds.indexOf(idy);
		if(yi>=0 && col){
			let row = this.rows[yi];
			row[col.id] = data;
			this.eventProxy.onCellChanged(this,col.id,idy,data)
		}
	}
	get length(){
		return this.rowIds.length - this.deletedRowIds.length;
	}
	get headers(){
		return this._headers.filter(h=>!h.deleted);
	}
	toString(){
		var buf = [];
		let ids = this.headers.map(h=>h.id)
		buf.push(this.headers.map(h=>h.label).join('\t|'),'\n')
		for(var row of this.rows){
			for(var id of ids){
				buf.push(row[id],'\t|');
			}
			buf.push('\n')
		}
		return buf.join('')
	}
}

class DataEvent{
	onCellChanged(baseData,idx,idy,data){

	}
	onRowAdded(baseData,idy,row){

	}
	onRowPush(baseData,idy,tails){}
	onRowRemoved(baseData,idy,row){}
	onColumnAdded(baseData,idx){}
	onColumnRemoved(baseData,idx){}
}
class DataEventProxy{
	constructor(list){
		this.list = list;
	}

	onCellChanged(baseData,idx,idy,data){
		for(let s of this.list){
			s.onCellChanged(baseData,idx,idy,data)
		}

	}
	onRowAdded(baseData,idy,row){
		for(let s of this.list){
			s.onRowAdded(baseData,idy,row)
		}
	}

	onRowPush(baseData,idy,tails){

	}
	onRowRemoved(baseData,idy,row){
		for(let s of this.list){
			s.onRowRemoved(baseData,idy,row)
		}
	}
	onColumnAdded(baseData,idx){
		for(let s of this.list){
			s.onColumnAdded(baseData,idx)
		}
	}
	onColumnRemoved(baseData,idx){
		for(let s of this.list){
			s.onColumnRemoved(baseData,idx)
		}
	}
}
class AbstractTable extends DataEventProxy{
	constructor(rawData,lineHeight){
		super([])
		this.data = rawData;
		//添加待通知视图
		rawData.dataViews.push(this)
    	//视图层需要存储的数据，列集合及附加信息，行集合及顺序
		this.config = {lineHeight,
			fixCloumn:1,
			headers:rawData.headers.map(a=>a),
			rowIds:rawData.rowIds.slice(),
			group:[]};
	}
	// getHeaderType(key){
	// 	return this.data.getHeaderType(key)
	// }
	createId(){
		return this.data.createId()
	}
	addRow(idy,row){
		return this.data.addRow(idy,row)
	}

	pushRow(idy,tailIds){
		return this.data.pushRow(idy,tailIds)
	}
	addRange(range){
		return this.data.addRange(range);
	}
	removeRow(idy,count){
		return this.data.removeRow(idy,count)

	}
	createColumn(name,type){
		return this.data.createColumn(name,type)
	}
	addColumn(col){
		return this.data.addColumn(col)
	}
	removeColumn(col){
		return this.data.removeColumn(col)

	}
	setData(idy,col,data){
		return this.data.setData(idy,col,data)
	}
	getRowIndex(i){
		return this.data.getRowIndex(i);//[i & 0xff];
	}
	getRow(i){
		let ri = this.data.getRowIndex(i);
		return this.data.rows[ri]
	}
	get length(){
		return this.data.length;
	}
	get headers(){
		return this.data.headers.map(h=>({
			width : 150,
			id:h.id,
			type  : h.type,
			label : h.label
		}));
	}

	toString(){
		return this.data.toString();
	}
}
export class RawTable extends AbstractTable{
	constructor(baseData,lineHeight){
		super(baseData || new BaseData(),lineHeight||40)
	}
}