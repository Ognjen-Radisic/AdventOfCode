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

	moves.forEach((action) => {
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
				const head = curTail - 1;
				updateTailPos(currentPositions[head], currentPositions[curTail]);
			}

			movementMap[`${currentPositions[9].xAxis},${currentPositions[9].yAxis}`] =
				{
					wasTailHere: true,
				};
		}
	});

	const totalTiles = Object.keys(movementMap).reduce((acc, key) => {
		if (movementMap[key].wasTailHere) return (acc += 1);
		else return acc;
	}, 0);
	console.log(totalTiles);
});

// 16 cases where head position triggers tail movement
const updateTailPos = (head, tail) => {
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

	// ADDITIONAL MOVEMENT FOR PART TWO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	// lots of these exclamation marks because it made me angry how much time I lost, but life goes one :)
	// I'm not even mad anymore (when you read this remember how big your smile was) xD
	// Devil is in the details of a text of the problem...
	// Solution was, after hours of trying, let it rest in the head for 2-3 days, think it through passively.
	// When I sat today, I solved it in 10 minutes

	//move up right corner
	else if (
		(head.yAxis - tail.yAxis === 2 && head.xAxis - tail.xAxis === 1) ||
		(head.yAxis - tail.yAxis === 1 && head.xAxis - tail.xAxis === 2) ||
		(head.yAxis - tail.yAxis === 2 && head.xAxis - tail.xAxis === 2)
	) {
		tail.yAxis += 1;
		tail.xAxis += 1;
	}

	//move down right corner
	else if (
		(head.yAxis - tail.yAxis === -2 && head.xAxis - tail.xAxis === 1) ||
		(head.yAxis - tail.yAxis === -1 && head.xAxis - tail.xAxis === 2) ||
		(head.yAxis - tail.yAxis === -2 && head.xAxis - tail.xAxis === 2)
	) {
		tail.yAxis -= 1;
		tail.xAxis += 1;
	}

	//move down left corner
	else if (
		(head.yAxis - tail.yAxis === -2 && head.xAxis - tail.xAxis === -1) ||
		(head.yAxis - tail.yAxis === -1 && head.xAxis - tail.xAxis === -2) ||
		(head.yAxis - tail.yAxis === -2 && head.xAxis - tail.xAxis === -2)
	) {
		tail.yAxis -= 1;
		tail.xAxis -= 1;
	}

	//move up left corner
	else if (
		(head.yAxis - tail.yAxis === 2 && head.xAxis - tail.xAxis === -1) ||
		(head.yAxis - tail.yAxis === 1 && head.xAxis - tail.xAxis === -2) ||
		(head.yAxis - tail.yAxis === 2 && head.xAxis - tail.xAxis === -2)
	) {
		tail.yAxis += 1;
		tail.xAxis -= 1;
	}
};
