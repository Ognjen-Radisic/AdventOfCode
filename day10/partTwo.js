const fs = require("fs");

fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) throw err;
  const actions = data.split(/\r?\n/);
  let spriteMidIndex = 1;
  let cycle = 0;

  const finalMap = [[], [], [], [], [], []];

  actions.forEach((oneAction) => {
    if (oneAction.includes("noop")) {
      cycle += 1;
      insertIntoFinal(finalMap, whatRow(cycle), spriteMidIndex, cycle);
    } else {
      const toAdd = oneAction.split(" ")[1];
      cycle += 1;
      insertIntoFinal(finalMap, whatRow(cycle), spriteMidIndex, cycle);

      cycle += 1;
      insertIntoFinal(finalMap, whatRow(cycle), spriteMidIndex, cycle);
      spriteMidIndex += +toAdd;
    }
  });
  console.log(finalMap.map((subArr) => subArr.join("")));
});

const insertIntoFinal = (finalArr, ind, spriteInd, cycle) => {
  if (
    spriteInd === cycle % 40 ||
    spriteInd + 1 === cycle % 40 ||
    spriteInd + 2 === cycle % 40
  ) {
    finalArr[ind].push("#");
  } else {
    finalArr[ind].push(".");
  }
};

const whatRow = (cyc) => {
  if (cyc <= 40) {
    return 0;
  } else if (cyc <= 80) {
    return 1;
  } else if (cyc <= 120) {
    return 2;
  } else if (cyc <= 160) {
    return 3;
  } else if (cyc <= 200) {
    return 4;
  } else if (cyc <= 240) {
    return 5;
  }
};
