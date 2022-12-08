const fs = require("fs");

const updateMap = (objectWithVisibleTrees, rowCord, columnCord) => {
	if (!objectWithVisibleTrees[`row${rowCord}column${columnCord}`]) {
		objectWithVisibleTrees[`row${rowCord}column${columnCord}`] = true;
	}
};

fs.readFile("data.txt", "utf8", (err, data) => {
	if (err) throw err;
	const visibleTreesCoordinates = {};
	const treeMap = data.split(/\r?\n/).map((row) => row.split(""));

	// from left to right
	for (let i = 0; i <= treeMap.length - 1; i++) {
		let biggest = -1;
		for (let j = 0; j <= treeMap[0].length - 1; j++) {
			if (+treeMap[i][j] > biggest) {
				biggest = +treeMap[i][j];
				updateMap(visibleTreesCoordinates, i, j);
			}
		}
	}
	//from top to down
	for (let i = 0; i <= treeMap[0].length - 1; i++) {
		let biggest = -1;
		for (let j = 0; j <= treeMap.length - 1; j++) {
			if (+treeMap[j][i] > biggest) {
				biggest = +treeMap[j][i];
				updateMap(visibleTreesCoordinates, j, i);
			}
		}
	}
	//from right to left
	for (let i = 0; i <= treeMap.length - 1; i++) {
		let biggest = -1;
		for (let j = treeMap[0].length - 1; j >= 0 - 1; j--) {
			if (+treeMap[i][j] > biggest) {
				biggest = +treeMap[i][j];
				updateMap(visibleTreesCoordinates, i, j);
			}
		}
	}
	//from down to top
	for (let i = treeMap[0].length - 1; i >= 0; i--) {
		let biggest = -1;
		for (let j = treeMap.length - 1; j >= 0; j--) {
			if (+treeMap[j][i] > biggest) {
				biggest = +treeMap[j][i];
				updateMap(visibleTreesCoordinates, j, i);
			}
		}
	}

	console.log(Object.values(visibleTreesCoordinates).length);
});
