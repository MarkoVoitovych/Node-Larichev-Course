const readline = require("readline");
const fs = require("fs/promises");
const { program } = require("commander");
require("colors");

program.option(
  "-f, --file [type]",
  "file for saving game results",
  "results.txt"
);
program.parse();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let count = 0;
const logFile = program.opts().file;
const mind = Math.floor(Math.random() * 10) + 1;

const isValid = (value) => {
  if (isNaN(value)) {
    console.log("Enter number".red);
    return false;
  }
  if (value < 1 || value > 10) {
    console.log("Enter number between 1 and 10".red);
    return false;
  }
  return true;
};

const log = async (data) => {
  try {
    await fs.appendFile(logFile, `${data}\n`);
    console.log(`We saved results in file ${logFile}`.green);
  } catch (error) {
    console.log(`Can't save results in file ${logFile}`.red);
  }
};

const game = () => {
  rl.question(
    "Enter number between 1 and 10 to guess our secret:".yellow,
    (value) => {
      let a = +value;
      if (!isValid(a)) {
        game();
        return;
      }

      count += 1;
      if (a === mind) {
        console.log(`Congratulations! You guest from %d attampt:`.green, count);
        log(
          `${new Date().toLocaleDateString()}: Вітаю Ви вгадали число за ${count} крок(ів)`
        ).finally(() => rl.close());
        return;
      }
      console.log("Try again".red);
      game();
    }
  );
};
game();
