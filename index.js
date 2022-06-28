// import { sim } from './simpleCoinCounts.js';
// import { sim } from './kmeans.js';
(async function () {
	const { sim } = await import(process.argv[2]);

	const cheatedCoin = () => {
		cheatedCoin.totalFlips = (cheatedCoin.totalFlips ?? 0) + 1;
		return Math.random() < 0.75;
	};
	const fairCoin = () => {
		fairCoin.totalFlips = (fairCoin.totalFlips ?? 0) + 1;
		return Math.random() < 0.5;
	};

	const coinArr = [];
	const n = 100000;

	for (let i = 0; i < n; i++)
		coinArr.push({ coin: Math.random() < 0.5 ? cheatedCoin : fairCoin });

	const [fairPlayers, cheaters] = sim(coinArr);

	function clr(text, ...args) {
		let strOut = '\x1b[39m' + text[0];

		for (let i = 1; i < text.length; i++) {
			strOut +=
				'\x1b[1;34m' + Math.round(args[i - 1] * 10) / 10 + '\x1b[39m' + text[i];
		}

		return strOut;
	}

	console.log(
		clr`Out of ${cheaters.length} suspected cheaters, only ${
			cheaters.filter((x) => x.coin == cheatedCoin).length
		} were cheaters. That is a ${
			100 -
			(cheaters.filter((x) => x.coin == cheatedCoin).length / cheaters.length) *
				100
		}% error rate.`
	);

	console.log(
		clr`Out of ${fairPlayers.length} fair players, only ${
			fairPlayers.filter((x) => x.coin == fairCoin).length
		} were fair. That is a ${
			100 -
			(fairPlayers.filter((x) => x.coin == fairCoin).length /
				fairPlayers.length) *
				100
		}% error rate.`
	);

	console.log(
		clr`Out of ${
			coinArr.filter((x) => x.coin == cheatedCoin).length
		} cheaters, only ${
			cheaters.filter((x) => x.coin == cheatedCoin).length
		} were caught. That is a ${
			(cheaters.filter((x) => x.coin == cheatedCoin).length /
				coinArr.filter((x) => x.coin == cheatedCoin).length) *
			100
		}% success rate. Target is >${80}%.`
	);
	console.log(
		clr`Out of ${
			coinArr.filter((x) => x.coin == fairCoin).length
		} fair players, only ${
			fairPlayers.filter((x) => x.coin == fairCoin).length
		} were let go. That is a ${
			(fairPlayers.filter((x) => x.coin == fairCoin).length /
				coinArr.filter((x) => x.coin == fairCoin).length) *
			100
		}% success rate, or a ${
			100 -
			(fairPlayers.filter((x) => x.coin == fairCoin).length /
				coinArr.filter((x) => x.coin == fairCoin).length) *
				100
		}% false positive rate. Target is <${5}%.`
	);
	console.log(
		clr`Cheaters flipped their coins ${
			cheatedCoin.totalFlips /
			coinArr.filter((x) => x.coin == cheatedCoin).length
		} times on average, for a total of ${cheatedCoin.totalFlips} flips.`
	);
	console.log(
		clr`Fair players flipped their coins ${
			fairCoin.totalFlips / coinArr.filter((x) => x.coin == fairCoin).length
		} times on average, for a total of ${fairCoin.totalFlips} flips.`
	);
	console.log(
		clr`Total coins flipped ${
			fairCoin.totalFlips + cheatedCoin.totalFlips
		} times.`
	);
})();
