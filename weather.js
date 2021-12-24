#!/usr/bin/env node
import getArgs from './helpers/getArgs.js';

const initCLI = () => {
  const args = getArgs(process.argv);
  console.log(args);
  if (args.h) {
    // Help
  }
  if (args.s) {
    // Save city
  }
  if (args.t) {
    // Save token
  }
};
initCLI();
