export function sim(coins) {
	coins.forEach((x) => {
		x.score = 0;
		for (let i = 0; i < 23; i++) x.score += +x.coin();
	});

	return [
		coins.filter((x) => x.score < 16),
		coins.filter((x) => x.score >= 16),
	];
}
