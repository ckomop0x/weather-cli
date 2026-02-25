import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';
import { isExist } from '../helpers/isExist.js';
import { CONFIG_FILE } from '../helpers/const.js';

const filePath = join(homedir(), CONFIG_FILE);

export const saveKeyValue = async (
  key: string,
  value: string,
): Promise<void> => {
  let data: Record<string, string> = {};

  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file.toString()) as Record<string, string>;
  }

  data[key] = value;
  await promises.writeFile(filePath, JSON.stringify(data));
};

export const loadKeyValue = async (
  key: string,
): Promise<string | undefined> => {
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    const data = JSON.parse(file.toString()) as Record<string, string>;
    return data[key];
  }
  return undefined;
};
