// import assert from "assert"
import {RawTable,DataStep} from "../lib/model.js"

function initData(rowCount,colCount){
	var t = new RawTable(null,32);
	var colIds = [];
	for(let i=0;i<colCount;i++){
		let col = t.createColumn("COL"+i);
		colIds.push(col.id)
		t.addColumn(col);
	}

	//for(let i=10000*200;i>=0;i--){
	for(let i=0;i<rowCount;i++){
		let row = {};
		let j = 0;
		for(let k of colIds){
			row[k] = i + 0.01*j++;
		}
		t.addRow(null,row);
	}
	//console.log(t+'')

	return t;
};

describe("",function(){
	

	it('toString',function(){
		let data = initData(13,5);
		console.log(data+'')

	})
	it("addRow",function(){
		let data = initData(13,5);
		let h1 = data.headers[0].id;
		let d = {};d[h1 ] = '#1'
		data.addRow(null,d)
		assertEqual(data.length,13+1);
		 d = {};d[h1 ] = '#2'
		data.addRow(null,d)
		assertEqual(data.length,13+2);
		 d = {};d[h1 ] = '#3'
		data.addRow(null,d)
		assertEqual(data.length,13+3);
		 d = {};d[h1 ] = '#4'
		data.addRow(null,d)
		assertEqual(data.length,13+4);
		 d = {};d[h1 ] = '#5'
		data.addRow(null,d)
		assertEqual(data.length,13+5);
		 d = {};d[h1 ] = '#6'
		data.addRow(data.createId(),d)
		assertEqual(data.length , 13 +6);
		for(let i=data.length-1;i>=0;i--){
			let i2 = data.getRowIndex(i);
			assertEqual(i,i2);
		}
		// console.log(data+'')
	});
	it("removeRow",function(){

		let data = initData(13,5);
		let from = 0;
		let ri = 0;
		while(data.length>1){
			data.removeRow(data.data.rowIds[ri++]);//每次都删掉第一个
			from ++;
			let i =  data.getRowIndex(0);
			assertEqual(i,from)
		}
		
		data = initData(13,5);// 0,...12
		from = 0;
		let end = data.length -1;
		while(end>=0){

			data.removeRow(data.data.rowIds[end]);//remove 7: 12,10 ......0 left 6: 1,3,....11
			console.log(data.length)
			end -=2;
		}

		assertEqual(data.length,6);

		for(let i=0;i<6;i++){
			let ri = data.getRowIndex(i);
			assertEqual(ri,i*2+1);
		}


	})
})