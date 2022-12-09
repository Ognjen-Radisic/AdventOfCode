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

	const lookedFromLeftToRight = treeMap.map(() => []);
	const lookedFromTopToDown = treeMap.map(() => []);
	const lookedFromRightToLeft = treeMap.map(() => []);
	const lookedFromDownToTop = treeMap.map(() => []);
	const compound = treeMap.map(() => []);

	// from left to right
	for (let i = 98; i <= treeMap.length - 1; i++) {
		for (let j = 0; j <= treeMap[0].length - 1; j++) {
			let howMuchWeSee = 1;
			for (let k = j; k <= treeMap[0].length - 1; k++) {
				if (treeMap[i][j] > treeMap[i][k + 1]) {
					howMuchWeSee += 1;
				} else break;
			}
			lookedFromLeftToRight[i].push(howMuchWeSee);
		}
	}
	//from top to down
	// for (let i = treeMap[0].length - 2; i <= treeMap[0].length - 1; i++) {
	// 	for (let j = 0; j <= treeMap.length - 1; j++) {
	// 		let howMuchWeSee = 1;
	// 		for (let k = j; k <= treeMap.length - 1; k++) {
	// 			if (treeMap[j][i] > treeMap[j + 1][k]) {
	// 				howMuchWeSee += 1;
	// 			} else break;
	// 		}
	// 		lookedFromTopToDown[j].push(howMuchWeSee);
	// 	}
	// }
	// //from right to left
	// for (let i = 0; i <= treeMap.length - 1; i++) {
	// 	let biggest = -1;
	// 	for (let j = treeMap[0].length - 1; j >= 0 - 1; j--) {
	// 		if (+treeMap[i][j] > biggest) {
	// 			biggest = +treeMap[i][j];
	// 			updateMap(visibleTreesCoordinates, i, j);
	// 		}
	// 	}
	// }
	// //from down to top
	// for (let i = treeMap[0].length - 1; i >= 0; i--) {
	// 	let biggest = -1;
	// 	for (let j = treeMap.length - 1; j >= 0; j--) {
	// 		if (+treeMap[j][i] > biggest) {
	// 			biggest = +treeMap[j][i];
	// 			updateMap(visibleTreesCoordinates, j, i);
	// 		}
	// 	}
	// }

	console.log(lookedFromLeftToRight);
});
