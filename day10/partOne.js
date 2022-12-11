const fs = require("fs");

fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) throw err;
  const actions = data.split(/\r?\n/);
  let xValue = 1;

  // Find the signal strength during the 20th, 60th, 100th, 140th, 180th, and 220th cycles.
  let strengthSignalSum = 0;
  let cycle = 0;
  actions.forEach((oneAction) => {
    if (oneAction.includes("noop")) {
      cycle += 1;
      if (isItTime(cycle)) {
        strengthSignalSum += cycle * xValue;
      }
    } else {
      const toAdd = oneAction.split(" ")[1];
      cycle += 1;
      if (isItTime(cycle)) {
        strengthSignalSum += cycle * xValue;
      }

      cycle += 1;
      if (isItTime(cycle)) {
        strengthSignalSum += cycle * xValue;
      }
      xValue += +toAdd;
    }
  });
  console.log(cycle);
});
const isItTime = (sig) => {
  return (
    sig === 20 ||
    sig === 60 ||
    sig === 100 ||
    sig === 140 ||
    sig === 180 ||
    sig === 220
  );
};
