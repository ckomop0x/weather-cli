import { getWeather } from '../services/api.service.js';
import { printError } from '../services/log.service.js';
import { loadKeyValue } from '../services/storage.service.js';
import { SETTINGS } from './const.js';
import type { WeatherData } from '../services/api.service.js';

export const getForecast = async (): Promise<WeatherData | undefined> => {
  try {
    const city = process.env.CITY ?? await loadKeyValue(SETTINGS.city);

    if (!city) {
      throw new Error('No city defined, please add default city -c [CITY]');
    }

    return await getWeather(city);
  } catch (e) {
    const err = e as { response?: { status?: number }; message?: string };
    if (err?.response?.status === 404) printError('Incorrect city provided');
    else if (err?.response?.status === 401) printError('Invalid API KEY provided');
    else if (err?.response?.status === 400) printError('No city provided');
    else printError(err.message ?? 'Unknown error');
  }
};

