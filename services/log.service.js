import chalk from 'chalk';
import dedent from 'dedent-js';

export const printError = (error) => console.log(
  `${chalk.bgRed(' ERROR ')} ${error}`,
);

export const printSuccess = (message) => console.log(
  `${chalk.bgGreen(' SUCCESS ')} ${message}`,
);

export const printHelp = () => console.log(
  dedent`${chalk.bgCyanBright(' HELP ')} 
   Without params – weather output
   -s [CITY] setup default city 
   -t [API_KEY] set token
   -h this help   
  `,
);
