export function binSearch(arr,v){
	let left = 0,right = arr.length-1;
	while(true){
		//mid >=left  mid<right
		var mid = (left+right)>>1;
		var mv = arr[mid];
		if(v==mv){
			return mid;
		}else if(v > mv){
			left = mid+1;
			if(left > right){
				return -mid-2
			}
		}else{//v<mv
			right = mid-1;
			if(left > right){
				return -mid-1;
			}
		}
	}
}
export function sortedSetAdd(arr,v){
	if(arr.length ==0 || v>arr[arr.length-1]){
		arr.push(v);
		return arr.length-1;
	}
	let p = binSearch(arr,v);
	if(p <0){
		arr.splice(-1-p,0, v);
		return -1-p;
	}else{
		return p;
	}
}

export function addBySortedIdx(ranges,range){
	if(ranges.length ==0 || v>ranges[arr.length-1][1]){
		ranges.push(v);
		return ranges.length-1;
	}
	let p = binSearchBySortedIdx(ranges,1,range[1]);
	if(p <0){
		p = -1-p;
	}
	ranges.splice(p,0, range);
}

export function binSearchBySortedIdx(ranges,idx,v){
	let left = 0,right = ranges.length-1;
	while(true){
		//mid >=left  mid<right
		var mid = (left+right)>>1;
		var mv = ranges[mid][idx];
		if(v==mv){
			return mid;
		}else if(v > mv){
			left = mid+1;
			if(left > right){
				return -mid-2
			}
		}else{//v<mv
			right = mid-1;
			if(left > right){
				return -mid-1;
			}
		}
	}
}