import chalk from "chalk";
import dedent from "dedent-js";

const printError = (error) => {
  console.log(chalk.bgRed(" ERROR ") + " " + error);
};

const printSucces = (message) => {
  console.log(chalk.bgGreen(" SUCCESS " + " " + message));
};

const printHelp = () => {
  console.log(
    dedent(`
        ${chalk.bgCyan(" HELP ")} 
        Without params - get weather
        -s [CITY] for choosing sity 
        -t [API_KEY] for saving token
        -h for Help info
        `)
  );
};

const printWeather = (res, icon) => {
  console.log(
    dedent(
      `${chalk.bgYellow(" WEATHER ")} in city ${res.name}
      ${icon}  ${res.weather[0].description}
      Temperature: ${res.main.temp}
      Humidity: ${res.main.humidity} %
      Wind: ${res.wind.speed}`
    )
  );
};

export { printError, printSucces, printHelp, printWeather };
