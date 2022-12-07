const fs = require("fs");

fs.readFile("data.txt", "utf8", (err, data) => {
	if (err) throw err;
	const depth = [];
	const allFolders = [];
	data.split(/\r?\n/).forEach((row) => {
		const parts = row.split(" ");
		if (!isNaN(parseInt(parts[0]))) {
			depth.forEach((dirInDepth) => (dirInDepth.size += parseInt(parts[0])));
		}
		if (row === "$ cd ..") {
			const lastDir = depth.pop();
			allFolders.push(lastDir);
		}
		if (row.includes("$ cd") && !row.includes(".."))
			depth.push({ directoryName: parts[2], size: 0 });
	});
	const spaceTaken = depth[0].size;
	const spaceFree = 70000000 - spaceTaken;
	const needToDelete = 30000000 - spaceFree;

	// add remaining folders to allFolders
	depth.forEach((dirInDepth) => allFolders.push(dirInDepth));

	//remove object from array and sort numbers
	const justValue = allFolders.map((e) => e.size);
	console.log(justValue.sort((a, b) => a - b).find((e) => e > needToDelete));
});
