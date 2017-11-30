/* Eloquent JavaScript ch05: Mother-Child Age Difference

Using the example data set from this chapter, compute the average age
difference between mothers and children (the age of the mother when
the child is born). You can use the average function defined earlier
in this chapter. 

Note that not all the mothers mentioned in the data are themselves
present in the array. The byName object, which makes it easy to find a
person’s object from their name, might be useful here. */

// for each person in list
// does person have mother yes/no
// if yes, is mother on list yes/no
// if yes, what is mother born date minus person's born date

// check for person's mother in list

// if mother present
	// work out person's age
	// work out mother's age
	// compute age difference

// add age difference to array

// add all entries in array together and divide by length


function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

var ages = []

ancestry.forEach(function(person) {
	if (person.mother) {
		ancestry.filter(function(mother) {
		  if (mother.name == person.mother) {
		  	ages.push(person.born - mother.born);
		  }
		});
	}	
});

var result = average(ages);

console.log(result); 
