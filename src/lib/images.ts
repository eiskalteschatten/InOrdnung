import { dialog } from 'electron';
import { promises as fsPromises } from 'fs';
import path from 'path';

import config from '../config';
import translations from '../intl';
import { getLocale } from '../lib/helper';

export const checkIfFileIsImage = (imagePath: string, promptUser = false): boolean => {
  const translation = translations[getLocale()];
  const extension = path.extname(imagePath).replace('.', '').toLowerCase();

  if (config.extensions.images.indexOf(extension) <= -1) {
    if (promptUser) {
      const extensionsString = config.extensions.images.join(', ');
      const errorDescription = `${translation.errorImageMustBeImageFileDesc} ${extensionsString}.`;
      dialog.showErrorBox(translation.errorImageMustBeImageFile, errorDescription);
      console.error(translation.errorImageMustBeImageFile, errorDescription);
    }

    return false;
  }

  return true;
};

export const encodeImage = async (imagePath: string): Promise<string> => {
  try {
    if (!checkIfFileIsImage(imagePath)) {
      throw new Error('The file is not an image!');
    }

    return  await fsPromises.readFile(imagePath, { encoding: 'base64' });
  }
  catch (error) {
    console.error(error);
    return '';
  }
};