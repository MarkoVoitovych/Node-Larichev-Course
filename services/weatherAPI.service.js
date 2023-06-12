import axios from "axios";
import { printError } from "./log.service.js";
import { getKeyValue } from "./storage.service.js";

const instance = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/weather",
  params: {
    units: "metric",
  },
});

const getIcon = (icon) => {
  switch (icon.slice(0, -1)) {
    case "01":
      return "☀️";
    case "02":
      return "🌤️";
    case "03":
      return "☁️";
    case "04":
      return "☁️";
    case "09":
      return "🌧️";
    case "10":
      return "🌦️";
    case "11":
      return "🌩️";
    case "13":
      return "❄️";
    case "50":
      return "🌫️";
  }
};

const getWeather = async (city) => {
  try {
    const token = await getKeyValue("token");
    if (!token) {
      throw new Error("No token provided");
    }
    const { data } = await instance.get("/", {
      params: {
        q: city,
        appid: token,
      },
    });
    return data;
  } catch (error) {
    printError(error.message);
  }
};

export { getWeather, getIcon };
