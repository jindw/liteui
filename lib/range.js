// class Range{
// 	constructor(id,top,bottom,left,right,type){
// 		this.id  = id;
// 		this.top = top;
// 		this.bottom = bottom;
// 		this.left = left;
// 		this.right = right;
//		thsi.type = type;
// 	}
// }
import {binSearch,addBySortedIdx,binSearchBySortedIdx} from 'util.js';
export class RangeManager{
	constructor(data,ranges){
		this.data = data;
		this.map = {};
		this.typeRanges = {};
		for(let range of ranges){
			this.addRange(range);
		}
		// this.singleCellRanges = [];
		// this.mutiCellRanges = [];
	}
	//range [id,top,bottom,left,right,type,config]
	addRange(range){
		let id = range[0];
		let oldRange = this.map[id];
		if(oldRange){
			let oldRanges = findTypeRangesByBottom(this.typeRanges,oldRange[5],oldRange[2]);
			let diff = 0;
			for(let i ==0;i<oldRange.length;i++){
				if(range[i] == null){
					range[i] = oldRange[i];
				}else if(range[i]!= oldRange[i]){
					diff+=(1<<i);
				}
			}
			let p = binSearchBySortedIdx(oldRanges,1,oldRange[1]);
			oldRanges.splice(p,1);
			let ranges = oldRanges;
			if(diff & (16 | 2)){//type bottom changed;
				ranges = findTypeRangesByBottom(this.typeRanges,range[5],range[2]);
			}
			addBySortedIdx(ranges,range);
		}else{
			let ranges = findTypeRangesByBottom(this.typeRanges,range[5],range[2]);
			addBySortedIdx(ranges,range);
		}
		this.map[id] = range;
	}
	onPushRow(idy,tails){
		let offset = tails.length;
		let ids = this.data.rowIds;
		let from = binSearch(ids,idy);
		ids = ids.slice(from);
		for(let key in this.typeRanges){
			let ranges = this.typeRanges[key];
			let  p = binSearchBySortedIdx(ranges,2,idy);
			for(p<0){
				p = -1-p;
			}
			while(p<ranges.length){
				let r = ranges[p];
				if(r.top >= idy){
					r.top = moveId(r.top,offset,ids);
				}
				r.bottom = moveId(r.bottom,offset,ids)
				p++;
			}
		}
	}
	onRowAdded(idy,offset){

	}
	onRowRemoved(idy){

	}
}
function moveId(id,offset,ids){
	let p = binSearch(ids,id);
	return ids[p+offset];
}


function findTypeRangesByBottom(typeRanges,type,bottom){
	let ranges = typeRanges[type]
	if(ranges){
		let p = binSearchBySortedIdx(ranges,2,bottom)

		if(p <0){
			let rtv = [];
			ranges.splice(-1-p,0, rtv);
		}else{
			return ranges[p];
		}
	}else{
		let rtv = [];
		typeRanges[type] = [rtv];
		return rtv;

	}
}
