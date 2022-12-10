const fs = require("fs");

fs.readFile("data.txt", "utf8", (err, data) => {
	if (err) throw err;
	const moves = data.split(/\r?\n/);
	const movementMap = {
		"0,0": { isHead: true, isTail: true, wasTailHere: true, wasHeadHere: true },
	};
	const curHeadPos = { xAxis: 0, yAxis: 0 };
	const curTailPos = { xAxis: 0, yAxis: 0 };

	moves.forEach((action) => {
		const where = action.split(" ")[0];
		const howMany = +action.split(" ")[1];

		for (let index = 0; index < howMany; index++) {
			if (where === "L") {
				curHeadPos.xAxis = curHeadPos.xAxis - 1;
			} else if (where === "U") {
				curHeadPos.yAxis += 1;
			} else if (where === "R") {
				curHeadPos.xAxis += 1;
			} else if (where === "D") {
				curHeadPos.yAxis -= 1;
			}
			updateHeadCoordinates(movementMap, curHeadPos.xAxis, curHeadPos.yAxis);
			updateTailPos(curHeadPos, curTailPos);
			updateTailCoordinates(movementMap, curTailPos.xAxis, curTailPos.yAxis);
		}
	});

	const totalTiles = Object.keys(movementMap).reduce((acc, key) => {
		if (movementMap[key].wasTailHere) return (acc += 1);
		else return acc;
	}, 0);
	console.log(totalTiles);
});

const updateHeadCoordinates = (map, x, y) => {
	if (map[`${x},${y}`]) {
		map[`${x},${y}`] = {
			...map[`${x},${y}`],
			isHead: true,
			wasHeadHere: true,
		};
	} else {
		map[`${x},${y}`] = {
			isHead: true,
			isTail: false,
			wasTailHere: false,
			wasHeadHere: true,
		};
	}
};

const updateTailCoordinates = (map, x, y) => {
	if (map[`${x},${y}`]) {
		map[`${x},${y}`] = {
			...map[`${x},${y}`],
			isTail: true,
			wasTailHere: true,
		};
	} else {
		map[`${x},${y}`] = {
			isHead: false,
			isTail: true,
			wasTailHere: true,
			wasHeadHere: false,
		};
	}
};

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
