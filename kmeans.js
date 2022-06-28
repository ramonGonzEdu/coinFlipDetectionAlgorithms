export function sim(coinArr) {
	function simulateTest(coin) {
		let score = 0;

		while (coin()) {
			score++;
		}

		return score;
	}

	// const nFlips = 24 / 3; // match 16/23 flip count
	// const nFlips = 80 / 3; // match 51/80 flip count
	const nFlips = 55; // 99% cheaters caught

	for (let coin of coinArr) {
		let score = 0;
		for (let i = 0; i < nFlips; i++) score += simulateTest(coin.coin);
		coin.score = score / nFlips;
	}

	let meanA = 2;
	let meanB = 4;
	const getMeanSplit = () => (meanA + meanB) / 2;
	//run k-means grouping

	function cycleMeans() {
		const meanAgroup = coinArr.filter((coin) => coin.score < getMeanSplit());
		const meanBgroup = coinArr.filter((coin) => coin.score >= getMeanSplit());
		meanA =
			meanAgroup.reduce((acc, coin) => acc + coin.score, 0) / meanAgroup.length;
		meanB =
			meanBgroup.reduce((acc, coin) => acc + coin.score, 0) / meanBgroup.length;
	}

	cycleMeans();
	cycleMeans();
	cycleMeans();
	cycleMeans();
	cycleMeans();
	cycleMeans();
	cycleMeans();
	cycleMeans();

	return [
		coinArr.filter((coin) => coin.score < getMeanSplit()),
		coinArr.filter((coin) => coin.score >= getMeanSplit()),
	];
}
