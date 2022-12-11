const fs = require("fs");

fs.readFile("data.txt", "utf8", (err, data) => {
	if (err) throw err;
	const moves = data.split(/\r?\n/);
	const movementMap = {
		"0,0": { wasTailHere: true },
	};
	const currentPositions = {};

	// create 10 knots, 0 is (first) head, 9 is (last)tail
	// individual pair: 0head-1tail, 1head-2tail, 2head-3tail... 8head-9tail
	for (let index = 0; index < 10; index++) {
		currentPositions[index] = { xAxis: 0, yAxis: 0 };
	}

	console.log(currentPositions);

	moves.forEach((action, actionIndex) => {
		const where = action.split(" ")[0];
		const howMany = +action.split(" ")[1];

		for (let index = 0; index < howMany; index++) {
			if (where === "L") {
				currentPositions[0].xAxis -= 1;
			} else if (where === "U") {
				currentPositions[0].yAxis += 1;
			} else if (where === "R") {
				currentPositions[0].xAxis += 1;
			} else if (where === "D") {
				currentPositions[0].yAxis -= 1;
			}

			for (let curTail = 1; curTail < 10; curTail++) {
				// if (curTail === 6)
				// 	console.log("tail before", "curTail", curTail, currentPositions[curTail]);
				const head = curTail - 1;

				updateTailPos(currentPositions[head], currentPositions[curTail]);
				if (curTail === 2) {
					console.log(actionIndex, "actionIndex", action);
					console.log(
						"tail after",
						"curTail",
						curTail,
						currentPositions[curTail]
					);
					console.log("===========");
				}
			}

			// updateTailCoordinates(
			// 	movementMap,
			// 	currentPositions[9].xAxis,
			// 	currentPositions[9].yAxis
			// );

			movementMap[`${currentPositions[9].xAxis},${currentPositions[9].yAxis}`] =
				{
					wasTailHere: true,
				};
		}
	});
	console.log(currentPositions);
	console.log(movementMap);
	// console.log(
	// 	Object.keys(movementMap).reduce((acc, key) => {
	// 		if (movementMap[key].wasTailHere) return (acc += 1);
	// 		else return acc;
	// 	}, 0)
	// );
});

// const updateTailCoordinates = (map, x, y) => {
// 	if (map[`${x},${y}`]) {
// 		map[`${x},${y}`] = {
// 			...map[`${x},${y}`],
// 			isTail: true,
// 			wasTailHere: true,
// 		};
// 	} else {
// 		map[`${x},${y}`] = {
// 			isHead: false,
// 			isTail: true,
// 			wasTailHere: true,
// 			wasHeadHere: false,
// 		};
// 	}
// };

const updateTailPos = (head, tail) => {
	// 12 cases where head position triggers tail movement

	//move 1 left or right
	if (head.yAxis === tail.yAxis) {
		switch (head.xAxis - tail.xAxis) {
			case -2:
				tail.xAxis -= 1;
				break;
			case 2:
				tail.xAxis += 1;
				break;
			default:
				break;
		}
	}
	//move 1 down or up
	else if (head.xAxis === tail.xAxis) {
		switch (head.yAxis - tail.yAxis) {
			case -2:
				tail.yAxis -= 1;
				break;
			case 2:
				tail.yAxis += 1;
				break;
			default:
				break;
		}
	}

	//move up right corner
	else if (
		(head.yAxis - tail.yAxis === 2 && head.xAxis - tail.xAxis === 1) ||
		(head.yAxis - tail.yAxis === 1 && head.xAxis - tail.xAxis === 2)
	) {
		tail.yAxis += 1;
		tail.xAxis += 1;
	}

	//move down right corner
	else if (
		(head.yAxis - tail.yAxis === -2 && head.xAxis - tail.xAxis === 1) ||
		(head.yAxis - tail.yAxis === -1 && head.xAxis - tail.xAxis === 2)
	) {
		tail.yAxis -= 1;
		tail.xAxis += 1;
	}

	//move down left corner
	else if (
		(head.yAxis - tail.yAxis === -2 && head.xAxis - tail.xAxis === -1) ||
		(head.yAxis - tail.yAxis === -1 && head.xAxis - tail.xAxis === -2)
	) {
		tail.yAxis -= 1;
		tail.xAxis -= 1;
	}

	//move up left corner
	else if (
		(head.yAxis - tail.yAxis === 2 && head.xAxis - tail.xAxis === -1) ||
		(head.yAxis - tail.yAxis === 1 && head.xAxis - tail.xAxis === -2)
	) {
		tail.yAxis += 1;
		tail.xAxis -= 1;
	}
};
