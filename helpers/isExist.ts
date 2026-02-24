import { promises } from 'fs';

export const isExist = async (path: string): Promise<boolean> => {
  try {
    await promises.stat(path);
    return true;
  } catch {
    return false;
  }
};

