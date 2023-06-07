const factorial = require("./factorial");

const compute = (arr) => {
  const array = [];
  for (let i = 0; i < 10000000; i++) {
    array.push(i * i);
  }
  return arr.map((el) => factorial(el));
};

function main() {
  performance.mark("start");
  const result = [
    compute([12, 14, 32, 22]),
    compute([12, 14, 32, 22]),
    compute([12, 14, 32]),
    compute([12, 14, 32]),
  ];

  console.log(result);

  performance.mark("end");

  performance.measure("main", "start", "end");
  console.log(performance.getEntriesByName("main").pop());
}

main();
