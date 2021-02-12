import config from '../config';
import translations from '../intl';

export const getLocale = (): string => process.env.LANG?.split('_')[0] ?? config.intl.defaultLocale;

export const getTranslation = (): any => translations[getLocale()];

export const sortStrings = (a: string, b: string, sortDirection = 'desc'): number => {
  if (sortDirection === 'asc') {
    if (!a) {
      return 1;
    }

    if (!b) {
      return -1;
    }

    if (a.toLowerCase() > b.toLowerCase()) {
      return 1;
    }
    else if (a.toLowerCase() < b.toLowerCase()) {
      return -1;
    }
  }
  else {
    if (!a) {
      return -1;
    }

    if (!b) {
      return 1;
    }

    if (a.toLowerCase() > b.toLowerCase()) {
      return -1;
    }
    else if (a.toLowerCase() < b.toLowerCase()) {
      return 1;
    }
  }

  return 0;
};
