const fs = require("fs");

fs.readFile("data.txt", "utf8", (err, data) => {
	if (err) throw err;
	let biggest = 0;
	let cur = 0;
	data.split("\n").forEach((e) => {
		if (!e) {
			if (cur > biggest) {
				biggest = cur;
			}
			cur = 0;
		} else {
			cur = cur + parseInt(e);
		}
	});
	console.log(biggest);
});
