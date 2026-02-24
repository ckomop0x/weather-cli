import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { WeatherData } from '../../services/api.service.js';

vi.mock('axios', () => ({
  default: { get: vi.fn() },
}));
vi.mock('../../services/storage.service.js', () => ({
  loadKeyValue: vi.fn(),
}));

import axios from 'axios';
import { loadKeyValue } from '../../services/storage.service.js';
import { getWeather } from '../../services/api.service.js';

const mockData: WeatherData = {
  name: 'London',
  sys: { country: 'GB' },
  weather: [{ icon: '01d', main: 'Clear' }],
  main: { temp: 20, feels_like: 18, humidity: 60 },
  wind: { speed: 5 },
};

describe('getWeather', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.TOKEN;
  });

  it('throws when no API key is available', async () => {
    vi.mocked(loadKeyValue).mockResolvedValue(undefined);

    await expect(getWeather('London')).rejects.toThrow(
      'No API key defined, please add key with -t [API_KEY]',
    );
  });

  it('uses TOKEN env var and returns weather data', async () => {
    process.env.TOKEN = 'env-token';
    vi.mocked(axios.get).mockResolvedValue({ data: mockData });

    const result = await getWeather('London');

    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        params: expect.objectContaining({ q: 'London', appid: 'env-token' }),
      }),
    );
  });

  it('uses stored token when TOKEN env var is not set', async () => {
    vi.mocked(loadKeyValue).mockResolvedValue('stored-token');
    vi.mocked(axios.get).mockResolvedValue({ data: mockData });

    const result = await getWeather('Paris');

    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        params: expect.objectContaining({ q: 'Paris', appid: 'stored-token' }),
      }),
    );
  });

  it('passes metric units and English language in params', async () => {
    process.env.TOKEN = 'test-token';
    vi.mocked(axios.get).mockResolvedValue({ data: mockData });

    await getWeather('Berlin');

    expect(axios.get).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        params: expect.objectContaining({ units: 'metric', lang: 'en' }),
      }),
    );
  });
});

