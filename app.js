const fs = require("fs");

console.log("Init");

setTimeout(() => {
  console.log(performance.now(), "Timer 0");
}, 10);

setImmediate(() => {
  console.log("Immediate");
});

fs.readFile(__filename, () => {
  console.log("Readed");
});

setTimeout(() => {
  for (let i = 0; i < 100000; i++) {
    return i;
  }
  console.log("Cicle done");
}, 0);

console.log("Final");
