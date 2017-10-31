var Year = function (input) {
  this.yearToTest = input;
};

Year.prototype.isLeap = function () {
	var quad = this.yearToTest/400;
	var century = this.yearToTest/100;
	var fouryear = this.yearToTest/4;
	if (quad === parseInt(quad)) {
		return true
	} else if (century === parseInt(century)) {
		return false
	} else if (fouryear === parseInt(fouryear)) {
		return true 
	} else {
		return false
	} 
};

module.exports = Year;
