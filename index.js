
import {TablePage} from "./lib/page-table.js";

// import {Draw} from "./lib/draw.js";
import {BaseData,RawTable} from "./lib/model.js";


var content_view = document.getElementById('content_view');




let data = function initData(){
	var t = new RawTable(null,32);
	var colIds = [];
	for(let i=0;i<10;i++){
		let col = t.createColumn("COL"+i);
		colIds.push(col.id)
		t.addColumn(col);
	}

	//for(let i=10000*200;i>=0;i--){
	for(let i=0xff;i>=0;i--){
		let row = {};
		for(let k of colIds){
			row[k] = i * 1000 + ((k + (k>>16))) & 0xff;
		}
		t.addRow(null,row);
	}
	//console.log(t+'')

	return t;
}();


var page = new TablePage(content_view,data);
page.onscroll(0, 0);
// let x=0,y=1000;
// let diff = 1000;
// setInterval(function(){
// 	if(y>100){
// 		diff = 3;
// 	}else if(y<10){
// 		diff = 3;
// 	}
// 	diff=2;
// 	//console.log(page)
// 	page.onscroll(page.scrollLeft||0, y+=diff);
// },26)
