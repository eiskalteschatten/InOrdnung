export interface Config {
  app: {
    name: string;
    version: string;
  };
  updates: {
    url: string;
  };
  intl: {
    defaultLocale: string;
  };
}

export default {
  app: {
    name: 'InOrdnung',
    version: '1.0.0'
  },
  updates: {
    url: 'update url'
  },
  intl: {
    defaultLocale: process.env.REACT_APP_LOCALE || 'en'
  }
} as Config;
