import https from 'https';
import axios from 'axios';
import { loadKeyValue } from './storage.service.js';
import { LANG, TOKEN_DICTIONARY } from '../helpers/const.js';
import { printError, printSuccess } from './log.service.js';

// eslint-disable-next-line import/prefer-default-export
export const getWeather = async (city) => {
  const token = await loadKeyValue(TOKEN_DICTIONARY.token);

  if (!token) {
    throw new Error('No API key defined, please add key with -t [API_KEY]');
  }

  const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: city,
      appid: token,
      lang: LANG.default,
      units: 'metric',
    },
  });
  return data;
};
