import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Buffer } from 'buffer';

vi.mock('../../helpers/isExist.js', () => ({
  isExist: vi.fn(),
}));
vi.mock('fs', () => ({
  promises: {
    readFile: vi.fn(),
    writeFile: vi.fn(),
  },
}));

import { promises } from 'fs';
import { isExist } from '../../helpers/isExist.js';
import { saveKeyValue, loadKeyValue } from '../../services/storage.service.js';

describe('storage.service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('saveKeyValue', () => {
    it('writes a new file when none exists', async () => {
      vi.mocked(isExist).mockResolvedValue(false);
      vi.mocked(promises.writeFile).mockResolvedValue();

      await saveKeyValue('city', 'London');

      expect(promises.writeFile).toHaveBeenCalledWith(
        expect.any(String),
        JSON.stringify({ city: 'London' }),
      );
    });

    it('merges new key into existing file data', async () => {
      vi.mocked(isExist).mockResolvedValue(true);
      vi.mocked(promises.readFile).mockResolvedValue(
        JSON.stringify({ token: 'abc' }) as unknown as Buffer,
      );
      vi.mocked(promises.writeFile).mockResolvedValue();

      await saveKeyValue('city', 'Paris');

      expect(promises.writeFile).toHaveBeenCalledWith(
        expect.any(String),
        JSON.stringify({ token: 'abc', city: 'Paris' }),
      );
    });

    it('overwrites an existing key', async () => {
      vi.mocked(isExist).mockResolvedValue(true);
      vi.mocked(promises.readFile).mockResolvedValue(
        JSON.stringify({ city: 'Berlin' }) as unknown as Buffer,
      );
      vi.mocked(promises.writeFile).mockResolvedValue();

      await saveKeyValue('city', 'Tokyo');

      expect(promises.writeFile).toHaveBeenCalledWith(
        expect.any(String),
        JSON.stringify({ city: 'Tokyo' }),
      );
    });
  });

  describe('loadKeyValue', () => {
    it('returns undefined when config file does not exist', async () => {
      vi.mocked(isExist).mockResolvedValue(false);
      expect(await loadKeyValue('city')).toBeUndefined();
    });

    it('returns the correct value from an existing file', async () => {
      vi.mocked(isExist).mockResolvedValue(true);
      vi.mocked(promises.readFile).mockResolvedValue(
        JSON.stringify({ city: 'Tokyo' }) as unknown as Buffer,
      );
      expect(await loadKeyValue('city')).toBe('Tokyo');
    });

    it('returns undefined for a key not present in the file', async () => {
      vi.mocked(isExist).mockResolvedValue(true);
      vi.mocked(promises.readFile).mockResolvedValue(
        JSON.stringify({ token: 'abc' }) as unknown as Buffer,
      );
      expect(await loadKeyValue('city')).toBeUndefined();
    });
  });
});

