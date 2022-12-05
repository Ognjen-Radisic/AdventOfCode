const fs = require("fs");

fs.readFile("data.txt", "utf8", (err, data) => {
	if (err) throw err;

	// transform text into workable data structure
	const parsedData = data.split("\n").map((e) => e.replace("\r", ""));
	const blankSpaceEl = parsedData.find((e) => e === "");
	const indexOfStackNamesRow = parsedData.indexOf(blankSpaceEl) - 1;
	const stacks = parsedData[indexOfStackNamesRow].trim().split("   ");
	const crates = parsedData.slice(0, indexOfStackNamesRow).reverse();
	const stackedStacks = {};
	stacks.forEach((stackNum, index) => {
		if (!stackedStacks[stackNum]) stackedStacks[stackNum] = [];
		crates.forEach((e) => {
			const element = e.charAt(index * 4 + 1);
			element !== " " && stackedStacks[stackNum].push(element);
		});
	});

	// apply movement commands to generated data structure
	const movement = parsedData.slice(indexOfStackNamesRow + 2);
	movement.forEach((action) => {
		const parsedAction = action.split(" ");
		const howMuch = parsedAction[1];
		const from = parsedAction[3];
		const to = parsedAction[5];

		const sliced = stackedStacks[from].splice(-howMuch);
		stackedStacks[to] = stackedStacks[to].concat(sliced);
	});

	//get last crate for each stack
	let lastCrateInEachStack = "";
	stacks.forEach((e) => {
		lastCrateInEachStack += stackedStacks[e].slice(-1);
	});
	console.log(lastCrateInEachStack);
});
