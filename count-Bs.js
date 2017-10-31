function countBs(word) {
	return countChar(word, "B");
};

function countChar(word, letter) {
	var count = 0;
	var x = (word.length - 1);
	for (i=0; i<x; i++) {
		if (word.charAt(i) == letter)
			count += 1;
	};
	return count;
};

countChar("ABBA", "B");
countBs("Abalone");
