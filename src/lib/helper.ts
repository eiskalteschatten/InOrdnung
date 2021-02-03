import config from '../config';
import translations from '../intl';

export const getLocale = (): string => process.env.LANG?.split('_')[0] ?? config.intl.defaultLocale;

export const getTranslation = (): any => translations[getLocale()];
