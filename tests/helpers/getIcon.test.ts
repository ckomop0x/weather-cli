import { describe, it, expect } from 'vitest';
import { getIcon } from '../../helpers/getIcon.js';

describe('getIcon', () => {
  it.each([
    ['01d', '☀️'],
    ['01n', '☀️'],
    ['02d', '🌤️'],
    ['02n', '🌤️'],
    ['03d', '☁️'],
    ['04d', '☁️'],
    ['09d', '🌧️'],
    ['10d', '🌦️'],
    ['11d', '🌩️'],
    ['13d', '❄️'],
    ['50d', '🌫️'],
    ['99d', ''],
  ])('returns correct icon for weather code %s', (code, expected) => {
    expect(getIcon(code)).toBe(expected);
  });
});
