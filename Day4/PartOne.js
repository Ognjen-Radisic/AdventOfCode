const fs = require("fs");

fs.readFile("data.txt", "utf8", (err, data) => {
	if (err) throw err;
	let totalScore = 0;
	data.split("\n").forEach((pair) => {
		const firstElf = pair.split(",")[0].split("-");
		const secondElf = pair.split(",")[1].replace("\r", "").split("-");

		if (
			(+firstElf[0] >= +secondElf[0] && +firstElf[1] <= +secondElf[1]) ||
			(+firstElf[0] <= +secondElf[0] && +firstElf[1] >= +secondElf[1])
		)
			totalScore += 1;
	});
	console.log(totalScore);
});
