import chalk from 'chalk';
import dedent from 'dedent-js';
import { getIcon } from '../helpers/getIcon.js';

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

export const printWeather = (forecast) => console.log(
  dedent`${chalk.bgBlueBright(' WEATHER ')} ${forecast.name} (${forecast.sys.country})
  ${getIcon(forecast.weather[0].icon)}  ${forecast.weather[0].main}
  Temperature: ${forecast.main.temp} (feels like: ${forecast.main.feels_like})
  Humidity: ${forecast.main.humidity}%
  Wind speed: ${forecast.wind.speed} km/h`,
);
