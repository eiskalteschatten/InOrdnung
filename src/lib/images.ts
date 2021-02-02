import { promises as fsPromises } from 'fs';

export const encodeImage = (imagePath: string): Promise<string> =>
  fsPromises.readFile(imagePath, { encoding: 'base64' });
