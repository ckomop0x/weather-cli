import axios from 'axios';
import { loadKeyValue } from './storage.service.js';
import { API_URL, LANG, SETTINGS } from '../helpers/const.js';

export const getWeather = async (city) => {
  const token = process.env.TOKEN ?? await loadKeyValue(SETTINGS.token);

  if (!token) {
    throw new Error('No API key defined, please add key with -t [API_KEY]');
  }

  const { data } = await axios.get(API_URL, {
    params: {
      q: city,
      appid: token,
      lang: LANG.en,
      units: 'metric',
    },
  });

  return data;
};
