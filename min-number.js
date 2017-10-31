function min(a, b) {
	if ((a < 0) && (b < 0)) {
		if (a / b < 1) {
			return (b)
		} else if (a / b === 1) {
			return (a + " is equal to " + b)
		} else {
			return (a)
		}
	} else {
		if (a / b > 1) {
			return (b)
		} else if (a / b === 1) {
			return (a + " is equal to " + b)
		} else {
			return (a)
		}
	}
};

min(-5,-50);