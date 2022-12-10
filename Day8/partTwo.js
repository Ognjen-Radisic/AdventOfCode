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

	const height = treeMap.length - 1;
	const width = treeMap[0].length - 1;

	const lookedFromLeftToRight = treeMap.map(() => []);
	const lookedFromTopToDown = treeMap.map(() => []);
	const lookedFromRightToLeft = treeMap.map(() => []);
	const lookedFromDownToTop = treeMap.map(() => []);
	const compound = treeMap.map(() => []);

	// from left to right
	for (let heightIndex = 0; heightIndex <= height; heightIndex++) {
		for (let widthIndex = 0; widthIndex <= width; widthIndex++) {
			let howMuchWeSee = 0;
			for (let cur = widthIndex + 1; cur <= width; cur++) {
				if (treeMap[heightIndex][widthIndex] > treeMap[heightIndex][cur]) {
					howMuchWeSee += 1;
				} else if (!treeMap[heightIndex][cur]) {
					break;
				} else {
					howMuchWeSee += 1;
					break;
				}
			}
			lookedFromLeftToRight[heightIndex].push(howMuchWeSee);
		}
	}
	//from top to down
	for (let widthInd = 0; widthInd <= width; widthInd++) {
		for (let heightIndex = 0; heightIndex <= height; heightIndex++) {
			let howMuchWeSee = 0;
			for (let cur = heightIndex + 1; cur <= height; cur++) {
				if (treeMap[heightIndex][widthInd] > treeMap[cur][widthInd]) {
					howMuchWeSee += 1;
				} else if (!treeMap[cur][widthInd]) {
					break;
				} else {
					howMuchWeSee += 1;
					break;
				}
			}
			lookedFromTopToDown[heightIndex].push(howMuchWeSee);
		}
	}
	//from right to left
	for (let heightIndex = height; heightIndex >= 0; heightIndex--) {
		for (let widthIndex = width; widthIndex >= 0; widthIndex--) {
			let howMuchWeSee = 0;
			for (let cur = widthIndex - 1; cur >= 0; cur--) {
				if (treeMap[heightIndex][widthIndex] > treeMap[heightIndex][cur]) {
					howMuchWeSee += 1;
				} else if (!treeMap[heightIndex][cur]) {
					break;
				} else {
					howMuchWeSee += 1;
					break;
				}
			}
			lookedFromRightToLeft[heightIndex].unshift(howMuchWeSee);
		}
	}
	//from down to top
	for (let widthInd = 0; widthInd <= width; widthInd++) {
		for (let heightIndex = height; heightIndex >= 0; heightIndex--) {
			let howMuchWeSee = 0;
			for (let cur = heightIndex - 1; cur >= 0; cur--) {
				if (treeMap[heightIndex][widthInd] > treeMap[cur][widthInd]) {
					howMuchWeSee += 1;
				} else if (!treeMap[cur][widthInd]) {
					break;
				} else {
					howMuchWeSee += 1;
					break;
				}
			}
			lookedFromDownToTop[heightIndex].push(howMuchWeSee);
		}
	}

	// make compound
	for (let heightIndex = 0; heightIndex <= height; heightIndex++) {
		for (let widthIndex = 0; widthIndex <= width; widthIndex++) {
			const compoundValueOfSingleTree =
				lookedFromLeftToRight[heightIndex][widthIndex] *
				lookedFromTopToDown[heightIndex][widthIndex] *
				lookedFromRightToLeft[heightIndex][widthIndex] *
				lookedFromDownToTop[heightIndex][widthIndex];
			compound[heightIndex].push(compoundValueOfSingleTree);
		}
	}

	let bestTree = 0;
	for (let heightIndex = 0; heightIndex <= height; heightIndex++) {
		for (let widthIndex = 0; widthIndex <= width; widthIndex++) {
			if (compound[heightIndex][widthIndex] > bestTree)
				bestTree = compound[heightIndex][widthIndex];
		}
	}

	console.log(bestTree);
});
