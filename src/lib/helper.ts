import config from '../config';

export const getLocale = (): string => process.env.LANG?.split('_')[0] ?? config.intl.defaultLocale;
