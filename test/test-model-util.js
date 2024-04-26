// import assert from "assert"
import {binSearch,sortedAdd} from "../lib/model.js"

let arr = [0,1,2,3,4,5,6,7,8,9]
describe("binSearch",function(){
	it("find result",function(){
		assertEqual(binSearch(arr,0),0,"find first pos")
		assertEqual(binSearch(arr,5),5,"find center pos")
		assertEqual(binSearch(arr,9),9,"find lasr pos")
	})
	it("no result",function(){
		assertEqual(binSearch(arr,-0.1),-1,"find -1 pos")
		assertEqual(binSearch(arr,0.1),-2,"find -2 pos")
		assertEqual(binSearch(arr,1.1),-3,"find -3 pos")
		assertEqual(binSearch(arr,9.1),-11,"find -11 pos")
	})
})

describe('sortedAdd',function(){
	

	it("add left",function(){
		arr = [2,3];
		sortedAdd(arr,1)
		assertEqual(arr.join('|'),'1|2|3')
	})

	it("add center",function(){
		arr = [2,3];

		sortedAdd(arr,2.1)
		assertEqual(arr.join('|'),'2|2.1|3')
	})
	it("add after",function(){
		arr = [2,3];

		sortedAdd(arr,4)
		assertEqual(arr.join('|'),'2|3|4')
	})
	it("find result",function(){
		let arr2 = arr.concat();
		for(var i = -1;i<12;i+=0.5){
			let arr3 = arr2.concat();
			let p = sortedAdd(arr3,i);
			assertEqual(p,arr3.indexOf(i));

			let exist = arr2.indexOf(i);
			if(exist >=0){
				assertEqual(arr3.length , arr2.length);
				assertEqual(arr3.join('/') , arr2.join('/'));
			}else{

				assertEqual(arr3.length , arr2.length+1);
				assertEqual(arr3.join('/'),arr3.concat().sort((a,b)=>a-b).join('/') );
			}
			

		}

	})
})