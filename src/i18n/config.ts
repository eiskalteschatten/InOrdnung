import { InitOptions } from 'i18next';

import config from '../config';
import resources from './locales';

export const defaulti18nConfig: InitOptions = {
  resources,
  defaultNS: 'common',
  fallbackLng: config.intl.defaultLocale,
  supportedLngs: config.intl.languages,
  nonExplicitSupportedLngs: true,
  preload: config.intl.languages,
  keySeparator: false,
  debug: false,// process.env.NODE_ENV === 'development',
  returnNull: false,
};

export default defaulti18nConfig;
