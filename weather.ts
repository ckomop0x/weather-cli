#!/usr/bin/env node
import { getArgs } from './helpers/getArgs.js';
import { printHelp, printWeather } from './services/log.service.js';
import { saveCity, saveToken } from './services/settings.service.js';
import { getForecast } from './helpers/getForecast.js';

const initCLI = async (): Promise<void> => {
  const { h: help, c: city, t: token } = getArgs(process.argv);

  if (help) return printHelp();
  if (city && typeof city === 'string') return saveCity(city);
  if (token && typeof token === 'string') return saveToken(token);

  const forecast = await getForecast();
  if (forecast) printWeather(forecast);
};

initCLI();
