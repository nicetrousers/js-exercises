/* Eloquent JavaScript ch05: Flattening  

Use the reduce method in combination with the concat method to
“flatten” an array of arrays into a single array that has all the
elements of the input arrays. */

const array2D = [[1,2,3],[4,5,6],[7,8,9]];

function reduce(array) {
	let array1D = [];
	for (i = 0; i < array.length; i++) {
		array1D = array1D.concat(array[i]);
	}
	return array1D;
};

reduce(array2D);

array2D.reduce(function(flat, current) {
	return flat.concat(current);
}, []);
