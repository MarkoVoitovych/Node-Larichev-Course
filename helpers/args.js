import { program } from "commander";

program
  .option("-h, --help", "help menu")
  .option("-s, --sity <type>", "choose sity")
  .option("-t, --token <type>", "weather token");

const getArgs = () => {
  program.parse();
  return program.opts();
};

export { getArgs };
