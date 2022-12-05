const fs = require("fs");

// Lowercase letters - 'a' through 'z' have values 1 through 26.
// Uppercase letters - 'A' through 'Z' have values 27 through 52.

const isUpperCase = (char) => /^[A-Z]*$/.test(char);

const getValueOfLetter = (letter) =>
	isUpperCase(letter) ? letter.charCodeAt() - 38 : letter.charCodeAt() - 96;

fs.readFile("data.txt", "utf8", (err, data) => {
	if (err) throw err;
	let totalScore = 0;
	const individualRucksacks = data.split("\n");
	individualRucksacks.forEach((oneRucksack, index) => {
		if (index % 3 === 0) {
			Array.from(oneRucksack).some(
				(letter) =>
					individualRucksacks[index + 1].includes(letter) &&
					individualRucksacks[index + 2].includes(letter) &&
					(totalScore += getValueOfLetter(letter))
			);
		}
	});
	console.log(totalScore);
});
