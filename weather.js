#!/usr/bin/env node
import getArgs from './helpers/getArgs.js';
import { printHelp } from './services/log.service.js';
import { saveToken } from './services/token.service.js';
import { getWeather } from './services/api.service.js';

const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    // Save city
    return true;
  }
  if (args.t) {
    return saveToken(args.t);
  }
  // Output weather
  return getWeather('Hoofddorp');
};
initCLI();
