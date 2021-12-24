import https from 'https';
import { loadKeyValue } from './storage.service.js';
import { LANG, TOKEN_DICTIONARY } from '../helpers/const.js';
import { printError, printSuccess } from './log.service.js';

export const getWeather = async (city) => {
  const token = await loadKeyValue(TOKEN_DICTIONARY.token);

  if (!token) {
    throw new Error('No API key defined, please add key with -t [API_KEY]');
  }

  const url = new URL('https://api.openweathermap.org/data/2.5/weather');
  url.searchParams.append('q', city);
  url.searchParams.append('appid', token);
  url.searchParams.append('lang', LANG.default);
  url.searchParams.append('units', 'metric');

  https.get(url, (response) => {
    let res = '';
    response.on('data', (chunk) => {
      res += chunk;
      console.log(res);
    });
    response.on('end', () => {
      printSuccess('Weather data received');
      console.log(res);
    });
    response.on('error', (err) => printError(err));
  });
};
