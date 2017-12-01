/* Eloquent JavaScript ch02: Chess Board

Write a program that creates a string that represents an 8 × 8 grid,
using newline characters to separate lines. At each position of the
grid there is either a space or a “#” character. The characters should
form a chess board.

Passing this string to console.log should show something like this:

# # # #
 # # # #
# # # #
 # # # #
# # # #
 # # # #
# # # #
 # # # #


When you have a program that generates this pattern, define a variable
size = 8 and change the program so that it works for any size,
outputting a grid of the given width and height. */

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

