var size = 8;
if (Number.isInteger(size)) {
	if (size == 1) {
		console.log('#');
	} else {
		var reps = Math.floor(size / 2);
		var oddPart = '# ';
		var evenPart = ' #';
		var breakLine = '\n';
		var completeBoard;
		if (size % 2 == 0 ) { 
			var oddLine = oddPart.repeat(reps) + breakLine;
			var evenLine = evenPart.repeat(reps) + breakLine;
			var completeBoard = (oddLine + evenLine).repeat(reps);
		} else {	
			var oddLine = oddPart.repeat(reps) + '#' + breakLine;
			var evenLine = evenPart.repeat(reps) + ' ' + breakLine;
			var completeBoard = (oddLine + evenLine).repeat(reps) + oddLine;
		}
	console.log(completeBoard);
	}
} else {
	console.log('please enter a full number')
}

