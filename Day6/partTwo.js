const fs = require("fs");

fs.readFile("data.txt", "utf8", (err, data) => {
	if (err) throw err;
	const lastElements = [];
	const resultIndex = data.split("").findIndex((element) => {
		if (lastElements.length === 14) {
			if (lastElements.length === new Set(lastElements).size) return true;
			else {
				lastElements.shift();
				lastElements.push(element);
			}
		} else lastElements.push(element);
	});
	console.log(resultIndex);
});
