const fs = require("fs");

fs.readFile("data.txt", "utf8", (err, data) => {
	if (err) throw err;
	const monkeysRaw = data.split(/\r?\n/);
	const initMonkeyData = {};

	// transform raw data into something workable
	monkeysRaw.forEach((row, index) => {
		// create monkey object
		if (row.includes(`Monkey`)) {
			initMonkeyData[`Monkey${index / 7}`] = {};
		}
		// add starting items to monkey
		else if (row.includes("Starting")) {
			const data = row
				.split(":")[1]
				.trim()
				.split(", ")
				.map((i) => +i);
			initMonkeyData[`Monkey${(index - 1) / 7}`].items = data;
			initMonkeyData[`Monkey${(index - 1) / 7}`].itemsTouched = 0;
		}
		// see if use addition or multiplication, by number or by itself
		else if (row.includes("Operation")) {
			const data = row.split("old")[1].trim().split(" ");
			initMonkeyData[`Monkey${(index - 2) / 7}`].operation =
				data[0] === "+" ? "plus" : "multiply";
			if (row.slice(-1) === "d") {
				initMonkeyData[`Monkey${(index - 2) / 7}`].operationBy = "old";
			} else {
				initMonkeyData[`Monkey${(index - 2) / 7}`].operationBy = +data[1];
			}
		}

		//worry level will be tested by this number
		else if (row.includes("Test")) {
			const data = row.split("by")[1].trim();
			initMonkeyData[`Monkey${(index - 3) / 7}`].divideBy = +data;
		}

		// if it is divisible (remainder is 0) pass item to monkey with this number
		else if (row.includes("true")) {
			const data = row.split("monkey")[1].trim();
			initMonkeyData[`Monkey${(index - 4) / 7}`].yes = data;
		}

		// if it is not divisible (remainder !== 0) pass item to monkey with this number
		else if (row.includes("false")) {
			const data = row.split("monkey")[1].trim();
			initMonkeyData[`Monkey${(index - 5) / 7}`].no = data;
		}
	});

	const howManyMonkeys = Object.keys(initMonkeyData).length;

	// number of rounds
	for (let round = 0; round < 20; round++) {
		// go through each monkey
		for (let monkey = 0; monkey < howManyMonkeys; monkey++) {
			const initialLength = initMonkeyData[`Monkey${monkey}`].items.length;
			// go through each item monkey is holding
			for (let item = 0; item < initialLength; item++) {
				const curMonkey = initMonkeyData[`Monkey${monkey}`];
				curMonkey.itemsTouched += 1;
				const itemPopped = curMonkey.items.shift();
				let itemModified;

				// get initial worry level for selected item
				if (curMonkey.operation === "plus") {
					if (curMonkey.operationBy === "old") {
						itemModified = itemPopped + itemPopped;
					} else {
						itemModified = itemPopped + curMonkey.operationBy;
					}
				} else {
					if (curMonkey.operationBy === "old") {
						itemModified = itemPopped * itemPopped;
					} else {
						itemModified = itemPopped * curMonkey.operationBy;
					}
				}

				// divide worry level by 3
				itemModified = Math.floor(itemModified / 3);

				// pass item based on new worry level if divisible by number, to next monkey
				if (itemModified % curMonkey.divideBy === 0) {
					initMonkeyData[`Monkey${curMonkey.yes}`].items.push(itemModified);
				} else {
					initMonkeyData[`Monkey${curMonkey.no}`].items.push(itemModified);
				}
			}
		}
	}

	// extract only value that tells us how many times money touched any item
	const finalArr = Object.keys(initMonkeyData).map(
		(key) => initMonkeyData[key].itemsTouched
	);

	const max1 = Math.max(...finalArr);
	finalArr.splice(finalArr.indexOf(max1), 1);
	const max2 = Math.max(...finalArr);
	console.log(max1 * max2);
});
