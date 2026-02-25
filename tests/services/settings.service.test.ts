import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../services/storage.service.js', () => ({
  saveKeyValue: vi.fn(),
}));
vi.mock('../../services/log.service.js', () => ({
  printError: vi.fn(),
  printSuccess: vi.fn(),
}));

import { saveKeyValue } from '../../services/storage.service.js';
import { printError, printSuccess } from '../../services/log.service.js';
import { saveToken, saveCity } from '../../services/settings.service.js';

describe('settings.service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('saveToken', () => {
    it('prints error and does not save when token is empty', async () => {
      await saveToken('');
      expect(printError).toHaveBeenCalledWith('Please provide a token');
      expect(saveKeyValue).not.toHaveBeenCalled();
    });

    it('saves token and prints success', async () => {
      vi.mocked(saveKeyValue).mockResolvedValue();
      await saveToken('my-api-token');
      expect(saveKeyValue).toHaveBeenCalledWith('token', 'my-api-token');
      expect(printSuccess).toHaveBeenCalledWith('Token saved');
    });

    it('prints error when saveKeyValue rejects', async () => {
      vi.mocked(saveKeyValue).mockRejectedValue(new Error('disk write error'));
      await saveToken('my-api-token');
      expect(printError).toHaveBeenCalledWith('disk write error');
    });
  });

  describe('saveCity', () => {
    it('prints error and does not save when city is empty', async () => {
      await saveCity('');
      expect(printError).toHaveBeenCalledWith('Please provide a city');
      expect(saveKeyValue).not.toHaveBeenCalled();
    });

    it('saves city and prints success', async () => {
      vi.mocked(saveKeyValue).mockResolvedValue();
      await saveCity('London');
      expect(saveKeyValue).toHaveBeenCalledWith('city', 'London');
      expect(printSuccess).toHaveBeenCalledWith('City saved');
    });

    it('prints error when saveKeyValue rejects', async () => {
      vi.mocked(saveKeyValue).mockRejectedValue(new Error('disk write error'));
      await saveCity('London');
      expect(printError).toHaveBeenCalledWith('disk write error');
    });
  });
});
