import { homedir } from "os";
import { join } from "path";
import { writeFile, readFile, stat } from "fs/promises";

const filePath = join(homedir(), "weather-data.json");

const isExist = async (path) => {
  try {
    await stat(path);
    return true;
  } catch (error) {
    return false;
  }
};

const saveKejValue = async (key, value) => {
  let data = {};
  if (await isExist(filePath)) {
    const file = await readFile(filePath);
    data = JSON.parse(file);
  }

  data[key] = value;
  await writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key) => {
  if (isExist(filePath)) {
    const file = await readFile(filePath);
    const data = JSON.parse(file);
    return data[key];
  }
  return null;
};

export { saveKejValue, getKeyValue };
