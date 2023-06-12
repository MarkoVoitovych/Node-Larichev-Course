#!/user/bin/env node
import { getArgs } from "./helpers/args.js";
import {
  printError,
  printHelp,
  printSucces,
  printWeather,
} from "./services/log.service.js";
import { getKeyValue, saveKejValue } from "./services/storage.service.js";
import { getIcon, getWeather } from "./services/weatherAPI.service.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError("No token");
    return;
  }
  try {
    await saveKejValue("token", token);
    printSucces("Token was saved");
  } catch (error) {
    printError(error.message);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError("No city entered");
    return;
  }
  try {
    await saveKejValue("city", city);
    printSucces("City was saved");
  } catch (error) {
    printError(error.message);
  }
};

const getForcast = async () => {
  const city = await getKeyValue("city");
  const weather = await getWeather(city);
  printWeather(weather, getIcon(weather.weather[0].icon));
};

const initCLI = () => {
  const args = getArgs();
  if (args.help) {
    return printHelp();
  }
  if (args.sity) {
    return saveCity(args.sity);
  }
  if (args.token) {
    return saveToken(args.token);
  }
  return getForcast();
};

initCLI();
