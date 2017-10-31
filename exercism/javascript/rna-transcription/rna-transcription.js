var DnaTranscriber = function(input) {
  this.x = input;
};

DnaTranscriber.prototype.toRna = function(x) {
	var Rna = [];
	var length = x.length;
	for (i = 1; i <= length; i++) {
		switch(x[i]) {
			case 'G':
				Rna.push('C');
				break;
			case 'C':
				Rna.push('G');
				break;
			case 'T':
				Rna.push('A');
				break;
			case 'A':
				Rna.push('U');
				break;
			default:
				Rna = 'Invalid input';
		};
	};
	console.log(Rna);
	Rna.prototype.join();
	return Rna;
};

module.exports = DnaTranscriber;