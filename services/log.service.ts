import chalk from 'chalk';
import dedent from 'dedent-js';
import { getIcon } from '../helpers/getIcon.js';
import type { WeatherData } from './api.service.js';

export const printError = (error: string): void => {
  console.log(`${chalk.bgRed(' ERROR ')} ${error}`);
};

export const printSuccess = (message: string): void => {
  console.log(`${chalk.bgGreen(' SUCCESS ')} ${message}`);
};

export const printHelp = (): void => {
  console.log(
    dedent`${chalk.bgCyanBright(' HELP ')} 
   Without params – weather output
   -s [CITY] setup default city 
   -t [API_KEY] set token
   -h this help   
  `,
  );
};

export const printWeather = (forecast: WeatherData): void => {
  console.log(
    dedent`${chalk.bgBlueBright(' WEATHER ')} ${forecast.name} (${forecast.sys.country})
  ${getIcon(forecast.weather[0].icon)}  ${forecast.weather[0].main}
  Temperature: ${forecast.main.temp} (feels like: ${forecast.main.feels_like})
  Humidity: ${forecast.main.humidity}%
  Wind speed: ${forecast.wind.speed} km/h`,
  );
};
