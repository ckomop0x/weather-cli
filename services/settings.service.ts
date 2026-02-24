import { saveKeyValue } from './storage.service.js';
import { printError, printSuccess } from './log.service.js';
import { SETTINGS } from '../helpers/const.js';

export const saveToken = async (token: string): Promise<void> => {
  if (!token.length) {
    printError('Please provide a token');
    return;
  }
  try {
    await saveKeyValue(SETTINGS.token, token);
    printSuccess('Token saved');
  } catch (e) {
    printError((e as Error).message);
  }
};

export const saveCity = async (city: string): Promise<void> => {
  if (!city.length) {
    printError('Please provide a city');
    return;
  }
  try {
    await saveKeyValue(SETTINGS.city, city);
    printSuccess('City saved');
  } catch (e) {
    printError((e as Error).message);
  }
};

