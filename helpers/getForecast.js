import { getWeather } from '../services/api.service.js';
import { printError } from '../services/log.service.js';
import { loadKeyValue } from '../services/storage.service.js';
import { SETTINGS } from './const.js';

export const getForecast = async () => {
  try {
    const city = process.env.CITY ?? await loadKeyValue(SETTINGS.city);

    if (!city) {
      throw new Error('No city defined, please add default city -c [CITY]');
    }

    return await getWeather(city);
  } catch (e) {
    if (e?.response?.status === 404) printError('Incorrect city provided');
    else if (e?.response?.status === 401) printError('Invalid API KEY provided');
    else if (e?.response?.status === 400) printError('No city provided');
    else printError(e.message);
  }
};
