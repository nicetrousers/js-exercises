/* Eloquent JavaScript ch05: Every and Then Some

Arrays also come with the standard methods every and some. Both take a
predicate function that, when called with an array element as
argument, returns true or false. Just like && returns a true value
only when the expressions on both sides are true, every returns true
only when the predicate returns true for all elements of the array.
Similarly, some returns true as soon as the predicate returns true for
any of the elements. They do not process more elements than
necessary—for example, if some finds that the predicate holds for the
first element of the array, it will not look at the values after that.

Write two functions, every and some, that behave like these methods,
except that they take the array as their first argument rather than
being a method. */

var a = [1,2,3];
var b = [1,1,1];

function every(array, argument) {
	for (i = 0; i < array.length; i++) {
		if (array[i] !== argument) {
			return false;
		}
	}
	return true;
}

function some(array, argument) {
	for (i = 0; i < array.length; i++) {
		if (array[i] === argument) {
			return true;
		}
	}
	return false;
}