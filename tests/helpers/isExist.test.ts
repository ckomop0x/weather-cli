import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Stats } from 'fs';

vi.mock('fs', () => ({
  promises: {
    stat: vi.fn(),
  },
}));

import { promises } from 'fs';
import { isExist } from '../../helpers/isExist.js';

describe('isExist', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns true when the path exists', async () => {
    vi.mocked(promises.stat).mockResolvedValue({} as Stats);
    expect(await isExist('/some/path')).toBe(true);
  });

  it('returns false when the path does not exist', async () => {
    vi.mocked(promises.stat).mockRejectedValue(new Error('ENOENT: no such file or directory'));
    expect(await isExist('/nonexistent/path')).toBe(false);
  });
});

