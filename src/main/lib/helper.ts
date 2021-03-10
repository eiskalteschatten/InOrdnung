import { app } from 'electron';

import config from '../../config';
import translations from '../../intl';

export const getLocale = (): string => app.getLocale() || config.intl.defaultLocale;

export const getTranslation = (): any => {
  const locale = getLocale().split('-')[0];
  return translations[locale] || translations[config.intl.defaultLocale];
};
