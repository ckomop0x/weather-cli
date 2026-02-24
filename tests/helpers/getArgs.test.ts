import { describe, it, expect } from 'vitest';
import { getArgs } from '../../helpers/getArgs.js';

describe('getArgs', () => {
  it('returns empty object when no flags are provided', () => {
    expect(getArgs(['node', 'weather.js'])).toEqual({});
  });

  it('parses a boolean flag (-h)', () => {
    expect(getArgs(['node', 'weather.js', '-h'])).toEqual({ h: true });
  });

  it('parses a flag with a string value (-c London)', () => {
    expect(getArgs(['node', 'weather.js', '-c', 'London'])).toEqual({
      c: 'London',
    });
  });

  it('parses a flag with a string value (-t token)', () => {
    expect(getArgs(['node', 'weather.js', '-t', 'mytoken123'])).toEqual({
      t: 'mytoken123',
    });
  });

  it('parses multiple flags with and without values', () => {
    expect(getArgs(['node', 'weather.js', '-c', 'Paris', '-h'])).toEqual({
      c: 'Paris',
      h: true,
    });
  });

  it('treats a flag immediately followed by another flag as true', () => {
    expect(getArgs(['node', 'weather.js', '-h', '-c', 'London'])).toEqual({
      h: true,
      c: 'London',
    });
  });
});
