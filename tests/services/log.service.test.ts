import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { WeatherData } from '../../services/api.service.js';
import { printError, printSuccess, printHelp, printWeather } from '../../services/log.service.js';

describe('log.service', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('printError', () => {
    it('outputs a string containing ERROR and the message', () => {
      printError('Something went wrong');
      expect(console.log).toHaveBeenCalledOnce();
      expect(vi.mocked(console.log).mock.calls[0][0]).toContain('ERROR');
      expect(vi.mocked(console.log).mock.calls[0][0]).toContain('Something went wrong');
    });
  });

  describe('printSuccess', () => {
    it('outputs a string containing SUCCESS and the message', () => {
      printSuccess('All good');
      expect(console.log).toHaveBeenCalledOnce();
      expect(vi.mocked(console.log).mock.calls[0][0]).toContain('SUCCESS');
      expect(vi.mocked(console.log).mock.calls[0][0]).toContain('All good');
    });
  });

  describe('printHelp', () => {
    it('outputs a string containing HELP', () => {
      printHelp();
      expect(console.log).toHaveBeenCalledOnce();
      expect(vi.mocked(console.log).mock.calls[0][0]).toContain('HELP');
    });
  });

  describe('printWeather', () => {
    const forecast: WeatherData = {
      name: 'London',
      sys: { country: 'GB' },
      weather: [{ icon: '01d', main: 'Clear' }],
      main: { temp: 20, feels_like: 18, humidity: 60 },
      wind: { speed: 5 },
    };

    it('outputs WEATHER header with city and country', () => {
      printWeather(forecast);
      const output = vi.mocked(console.log).mock.calls[0][0] as string;
      expect(output).toContain('WEATHER');
      expect(output).toContain('London');
      expect(output).toContain('GB');
    });

    it('outputs temperature, humidity and wind speed', () => {
      printWeather(forecast);
      const output = vi.mocked(console.log).mock.calls[0][0] as string;
      expect(output).toContain('20');
      expect(output).toContain('18');
      expect(output).toContain('60');
      expect(output).toContain('5');
    });

    it('outputs the weather condition', () => {
      printWeather(forecast);
      const output = vi.mocked(console.log).mock.calls[0][0] as string;
      expect(output).toContain('Clear');
    });

    it('includes the correct weather icon', () => {
      printWeather(forecast);
      const output = vi.mocked(console.log).mock.calls[0][0] as string;
      expect(output).toContain('☀️');
    });
  });
});

