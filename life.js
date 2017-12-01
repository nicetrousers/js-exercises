/* Eloquent JavaScript ch05: Historical Life Expectancy 

When we looked up all the people in our data set that lived more than
90 years, only the latest generation in the data came out. Let’s take
a closer look at that phenomenon.

Compute and output the average age of the people in the ancestry data
set per century. A person is assigned to a century by taking their
year of death, dividing it by 100, and rounding it up, as in
Math.ceil(person.died / 100). */

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


