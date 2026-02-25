import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { WeatherData } from '../../services/api.service.js';

vi.mock('../../services/api.service.js', () => ({
  getWeather: vi.fn(),
}));
vi.mock('../../services/log.service.js', () => ({
  printError: vi.fn(),
}));
vi.mock('../../services/storage.service.js', () => ({
  loadKeyValue: vi.fn(),
}));

import { getWeather } from '../../services/api.service.js';
import { printError } from '../../services/log.service.js';
import { loadKeyValue } from '../../services/storage.service.js';
import { getForecast } from '../../helpers/getForecast.js';

describe('getForecast', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.CITY;
  });

  it('returns weather data using CITY env var', async () => {
    process.env.CITY = 'London';
    const mockData: WeatherData = {
      name: 'London',
      sys: { country: 'GB' },
      weather: [{ icon: '01d', main: 'Clear' }],
      main: { temp: 20, feels_like: 18, humidity: 60 },
      wind: { speed: 5 },
    };
    vi.mocked(getWeather).mockResolvedValue(mockData);

    expect(await getForecast()).toEqual(mockData);
    expect(getWeather).toHaveBeenCalledWith('London');
  });

  it('returns weather data using city from storage', async () => {
    vi.mocked(loadKeyValue).mockResolvedValue('Paris');
    const mockData: WeatherData = {
      name: 'Paris',
      sys: { country: 'FR' },
      weather: [{ icon: '02d', main: 'Clouds' }],
      main: { temp: 15, feels_like: 13, humidity: 70 },
      wind: { speed: 3 },
    };
    vi.mocked(getWeather).mockResolvedValue(mockData);

    expect(await getForecast()).toEqual(mockData);
    expect(getWeather).toHaveBeenCalledWith('Paris');
  });

  it('calls printError when no city is defined', async () => {
    vi.mocked(loadKeyValue).mockResolvedValue(undefined);

    await getForecast();

    expect(printError).toHaveBeenCalledWith(
      'No city defined, please add default city -c [CITY]',
    );
    expect(getWeather).not.toHaveBeenCalled();
  });

  it('calls printError with "Incorrect city provided" on 404', async () => {
    process.env.CITY = 'UnknownCity';
    vi.mocked(getWeather).mockRejectedValue({ response: { status: 404 } });

    await getForecast();

    expect(printError).toHaveBeenCalledWith('Incorrect city provided');
  });

  it('calls printError with "Invalid API KEY provided" on 401', async () => {
    process.env.CITY = 'London';
    vi.mocked(getWeather).mockRejectedValue({ response: { status: 401 } });

    await getForecast();

    expect(printError).toHaveBeenCalledWith('Invalid API KEY provided');
  });

  it('calls printError with "No city provided" on 400', async () => {
    process.env.CITY = 'London';
    vi.mocked(getWeather).mockRejectedValue({ response: { status: 400 } });

    await getForecast();

    expect(printError).toHaveBeenCalledWith('No city provided');
  });

  it('calls printError with the error message for generic errors', async () => {
    process.env.CITY = 'London';
    vi.mocked(getWeather).mockRejectedValue(new Error('Network error'));

    await getForecast();

    expect(printError).toHaveBeenCalledWith('Network error');
  });

  it('calls printError with "Unknown error" when error has no message', async () => {
    process.env.CITY = 'London';
    vi.mocked(getWeather).mockRejectedValue({});

    await getForecast();

    expect(printError).toHaveBeenCalledWith('Unknown error');
  });
});
