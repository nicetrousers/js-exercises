/* Eloquent JavaScript ch04: The Sum of a Range

The introduction of this book alluded to the following as a nice 
way to compute the sum of a range of numbers:

console.log(sum(range(1, 10)));

Write a range function that takes two arguments, start and end, and 
returns an array containing all the numbers from start up to (and 
including) end.

Next, write a sum function that takes an array of numbers and 
returns the sum of these numbers. Run the previous program and see 
whether it does indeed return 55.

As a bonus assignment, modify your range function to take an 
optional third argument that indicates the “step” value used to 
build up the array. If no step is given, the array elements go up 
by increments of one, corresponding to the old behavior. The 
function call range(1, 10, 2) should return [1, 3, 5, 7, 9]. Make 
sure it also works with negative step values so that range(5, 2, 
-1) produces [5, 4, 3, 2]. */

function rangeBetween(start, end, step) {
	var rangeArray = [];
	var counter = 1;
	if (step) {
		if ((start > end && step > 0) || (start < end && step < 0)) {
			console.log("invalid range");
			return false;
		} else {
			counter = step;
		};
	};
	if (start > end) {
		for (i = start; i >= end; i += counter) rangeArray.push(i);
	} else {
		for (i = start; i <= end; i += counter) rangeArray.push(i);
	};
	return rangeArray
};

function sumArray(anArray) {
	var total = 0;
	for (i=0; i<anArray.length; i++) {
		total = total + anArray[i];
	};
	return total;
}

sumArray(rangeBetween(1,10))

rangeBetween(1,10);

rangeBetween(5,2,-1);
