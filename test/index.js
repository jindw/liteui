// import assert from "assert"
import {binSearch,sortedAdd} from "../lib/model.js"
// console.log('....@@@@')
(function(global){
	global.assertEqual = assertEqual;
})((typeof global) == 'undefined'? window:global);
function assertEqual(actual, expected, message) {
  let equal =  actual == expected  || (typeof actual =='number' &&  isNaN(actual) && (typeof expected =='number') &&  isNaN(expected));
  if(!equal){
  	console.log('test failed',actual, expected, message)
    let err = new Error();
    err.actual = actual;
    err.expected = expected;
    err.message = message;
    err.operator = "==";
    throw err;
	}
}
import {} from "./test-model-util.js"
import {} from "./test-model-data.js"