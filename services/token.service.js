import { saveKeyValue } from './storage.service.js';
import { printError, printSuccess } from './log.service.js';
import { TOKEN_DICTIONARY } from '../helpers/const.js';

export const saveToken = async (token) => {
  if (!token.length) {
    printError('Please provide a token');
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess('Token saved');
  } catch (e) {
    printError(e.message);
  }
};
