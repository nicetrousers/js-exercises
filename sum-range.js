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
