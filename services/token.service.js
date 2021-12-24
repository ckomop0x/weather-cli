import { saveKeyValue } from './storage.service.js';
import { printError, printSuccess } from './log.service.js';

export const saveToken = async (token) => {
  try {
    await saveKeyValue('token', token);
    printSuccess('Token saved');
  } catch (e) {
    printError(e.message);
  }
};
