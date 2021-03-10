import { app } from 'electron';

import config from '../../config';
import translations from '../../intl';

export const getLocale = (): string => app.getLocale() || config.intl.defaultLocale;

export const getTranslation = (): any => translations[getLocale()];
