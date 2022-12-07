const fs = require("fs");

fs.readFile("data.txt", "utf8", (err, data) => {
	if (err) throw err;
	let sum = 0;
	const depth = [];
	data.split(/\r?\n/).forEach((row) => {
		const parts = row.split(" ");
		if (!isNaN(parseInt(parts[0]))) {
			depth.forEach((dirInDepth) => (dirInDepth.size += parseInt(parts[0])));
		} else if (row === "$ cd ..") {
			const lastDir = depth.pop();
			if (lastDir.size <= 100000) sum += lastDir.size;
		} else if (row.includes("$ cd") && !row.includes(".."))
			depth.push({ directoryName: parts[2], size: 0 });
	});
	// remaining folders, that are not popped but are less than 100000
	depth.forEach(
		(dirInDepth) => dirInDepth.size <= 100000 && (sum += dirInDepth.size)
	);
	console.log(sum);
});
