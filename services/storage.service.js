import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';
import { isExist } from '../helpers/isExist.js';
import { CONFIG_FILE } from '../helpers/const.js';

const filePath = join(homedir(), CONFIG_FILE);

export const saveKeyValue = async (key, value) => {
  let data = {};

  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file);
  }

  data[key] = value;
  await promises.writeFile(filePath, JSON.stringify(data));
};

export const loadKeyValue = async (key) => {
  let data;
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file);
  }
  return data?.[key];
};
