/* Eloquent JavaScript ch05: Historical Life Expectancy 

When we looked up all the people in our data set that lived more than
90 years, only the latest generation in the data came out. Let’s take
a closer look at that phenomenon.

Compute and output the average age of the people in the ancestry data
set per century. A person is assigned to a century by taking their
year of death, dividing it by 100, and rounding it up, as in
Math.ceil(person.died / 100). 

For bonus points, write a function groupBy that abstracts the grouping
operation. It should accept as arguments an array and a function that
computes the group for an element in the array and returns an object
that maps group names to arrays of group numbers.*/

function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

function cAverage(century) {
	var ages = [];
	var century = century;
	ancestry.forEach(function(person) {
		var c = Math.ceil(person.died / 100);
		if (c === century) {
			var age = person.died - person.born
			ages.push(age);
		}
	});
	console.log( average(ages) ); 
};

cAverage(19);

// update to automatically average all present centuries
// not just the century passed to function

function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

var centuries = new Object();

ancestry.forEach(function(person) { 
	var c = Math.ceil(person.died / 100);
	if (centuries[c] === undefined) centuries[c] = [];
	centuries[c].push(person);
});

Object.keys(centuries).forEach(function(key) {
	ages = [];
	centuries[key].forEach(function(person) {
		var age = person.died - person.born
			ages.push(age);
	});
	console.log( average(ages) ); 
});