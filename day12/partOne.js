const fs = require("fs");

fs.readFile("data.txt", "utf8", (err, data) => {
	if (err) throw err;
	const mountainMap = data.split(/\r?\n/).map((row, rowIndex) =>
		row.split("").map((letter, columnIndex) => {
			return {
				value: valueOfLetter(letter),
				visited: false,
				direction: ".",
				x: columnIndex,
				y: rowIndex,
			};
		})
	);
	let startingPos;
	let endPos;

	mountainMap.forEach((row) => {
		row.forEach((point) => {
			if (point.value === -14) {
				startingPos = point;
			} else if (point.value === -28) {
				endPos = point;
			}
		});
	});
	console.log(mountainMap);
	console.log(startingPos, endPos);
});

const valueOfLetter = (letter) => {
	return letter.charCodeAt(0) - 97;
};
