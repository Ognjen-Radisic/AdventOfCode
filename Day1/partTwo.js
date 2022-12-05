const fs = require("fs");

fs.readFile("data.txt", "utf8", (err, data) => {
	if (err) throw err;
	const top3 = [0, 0, 0];
	let cur = 0;
	data.split("\n").forEach((e) => {
		if (!e) {
			const minItem = Math.min(...top3);
			if (cur > minItem) {
				const indexOfLowest = top3.indexOf(minItem);
				top3[indexOfLowest] = cur;
			}
			cur = 0;
		} else {
			cur = cur + parseInt(e);
		}
	});

	const sumOfTop3Calories = top3.reduce((partialSum, a) => partialSum + a, 0);
	console.log(sumOfTop3Calories);
});
