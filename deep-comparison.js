/*  The == operator compares objects by identity. But sometimes, you
would prefer to compare the values of their actual properties.

Write a function, deepEqual, that takes two values and returns true
only if they are the same value or are objects with the same
properties whose values are also equal when compared with a recursive
call to deepEqual.

To find out whether to compare two things by identity (use the ===
operator for that) or by looking at their properties, you can use the
typeof operator. If it produces "object" for both values, you should
do a deep comparison. But you have to take one silly exception into
account: by a historical accident, typeof null also produces "object".
*/

var x = 1;
var y = 2;
var z = 1;
var a = { value: 1, };
var b = { value: 2, };
var c = { value: 2, };
var n = null;
var nn = null;

function deepEqual(value1,value2) {
	if (typeof(value1) == "object" && typeof(value2) == "object") {
		if (value1 == null || value2 == null) {
			return ((value1 === value2) ? true : false);
		} else {
			console.log("objection");
		}
	} else {
		return ((value1 === value2) ? true : false);
	}
}

deepEqual(x,y);




function listToArray(list) {
	newArray = [];
	for (var node = list; node; node = node.rest) {
		newArray.push(node.value);
	}
	return newArray;
};