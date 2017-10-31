function isEven(N) {
	N = Math.abs(N);
	while (N > 1) {
		N = N - 2;
	};
	return (!N ? true : false);
};

isEven(6);