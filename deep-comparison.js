/* Eloquent JavaScript ch04: Deep Comparison

The == operator compares objects by identity. But sometimes, you
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
var a = { value: 1, name: "Keith", drink: "Coke", };
var b = { value: 2, name: "Kim", drink: "Sprite", };
var c = { value: 2, name: "Kim", drink: "Sprite", };
var d = { value: 1, name: "Keith", food: "pizza", };
var e = { value: 1, name: "Keith", food: a, };
var f = { value: 1, name: "Keith", food: a, };
var g = { value: 1, name: "Keith", food: b, };
var n = null;
var nn = null;

function deepEqual(value1,value2) {
	// check if both values are objects
	if (typeof(value1) == "object" && typeof(value2) == "object") {
		// check if either object is null
		if (value1 == null || value2 == null) {
			// check if both objects are null or not
			return ((value1 === value2) ? true : false);
		} else {
			// check if objects are same length
			if (Object.keys(value1).length == Object.keys(value2).length) {
				// if objects same length, loop through properties
				for (var property in value1) {
					// check property isn't default object property
					if (value1.hasOwnProperty(property)) {
						// if second value does NOT have same property return false
						if (!value2.hasOwnProperty(property)) {
							return false;
						} 
					}
				}
				// if properties match, loop through properties again
				for (var property in value1) {
					// check property isn't default object property
					if (value1.hasOwnProperty(property)) {
						// check if property values match by recursively calling
						// deepEqual function on them, and
						// if property values do NOT match return false
						if (!deepEqual(value1[property],value2[property])) {
							return false;
						}
					}
				}
				// if properties and values match then
				return true;
			} else {
				// if objects are not same length
				return false
			}
		}
	} else {
		// if values are not objects, check if they are equal
		return ((value1 === value2) ? true : false);
	}
}

deepEqual(a,b);
deepEqual(b,c);

deepEqual(a,d);
