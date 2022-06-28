export function sim(coins) {
	coins.forEach((x) => {
		x.score = 0;
		for (let i = 0; i < 80; i++) x.score += +x.coin();
	});

	return [
		coins.filter((x) => x.score < 51),
		coins.filter((x) => x.score >= 51),
	];
}
