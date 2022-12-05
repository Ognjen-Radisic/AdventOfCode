const fs = require("fs");

const allOutcomes = {
	// X means we need to lose
	// Y means we need to draw
	// Z means we need to win
	// Opponent signs: A=rock, B=paper, C=scissors

	// Value of my signs: rock 1 point, paper 2 points, scissors 3 points
	// lost match 0 points, draw 3 points, win 6points
	X: {
		A: 3,
		B: 1,
		C: 2,
	},
	Y: {
		A: 4,
		B: 5,
		C: 6,
	},
	Z: {
		A: 8,
		B: 9,
		C: 7,
	},
};

fs.readFile("data.txt", "utf8", (err, data) => {
	if (err) throw err;
	let totalScore = 0;
	data.split("\n").forEach((e) => {
		const plays = e.split(" ");
		const opponent = plays[0];
		const me = plays[1];
		totalScore += allOutcomes[me][opponent];
	});
	console.log(totalScore);
});
