const fs = require("fs");

// Lowercase letters - 'a' through 'z' have values 1 through 26.
// Uppercase letters - 'A' through 'Z' have values 27 through 52.

const isUpperCase = (char) => /^[A-Z]*$/.test(char);

const getValueOfLetter = (letter) =>
	isUpperCase(letter) ? letter.charCodeAt() - 38 : letter.charCodeAt() - 96;

fs.readFile("data.txt", "utf8", (err, data) => {
	if (err) throw err;
	let totalScore = 0;
	data.split("\n").forEach((oneRucksack) => {
		const firstHalf = oneRucksack.substring(0, oneRucksack.length / 2);
		const secondHalf = oneRucksack.substring(
			oneRucksack.length / 2,
			oneRucksack.length
		);
		Array.from(firstHalf).some(
			(item) =>
				secondHalf.includes(item) && (totalScore += getValueOfLetter(item))
		);
	});
	console.log(totalScore);
});
