import { promises } from 'fs';

export const isExist = async (path) => {
  try {
    await promises.stat(path);
    return true;
  } catch {
    return false;
  }
};
