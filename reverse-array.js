/* Eloquent JavaScript ch04: Reversing an Array
Arrays have a method reverse, which changes the array by inverting 
the order in which its elements appear. For this exercise, write 
two functions, reverseArray and reverseArrayInPlace. The first, 
reverseArray, takes an array as an argument and produces a new 
array that has the same elements in the inverse order. The second, 
reverseArrayInPlace, does what the reverse method does: it modifies 
the array given as argument in order to reverse its elements. 
Neither may use the standard reverse method. */

var x = [1,2,3,4,5]

function reverseArray(inputArray) {
	outputArray = [];
	for (i = 0; i < inputArray.length; i++) {
		outputArray.unshift(inputArray[i]);
	}
	return outputArray;
}

reverseArray(x)

var y = [1,2,3,4,5,6,7,8]

function reverseArrayInPlace(anArray) {
	limit = Math.floor(anArray.length / 2);
	for (i = 0; i < limit; i++) {
		var temp = anArray[i];
		anArray[i] = anArray[anArray.length - 1 - i];
		anArray[anArray.length - 1 - i] = temp;
	}
	return anArray;
}

reverseArrayInPlace(y)