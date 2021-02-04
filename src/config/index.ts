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
  extensions: {
    default: string;
    images: string[];
  };
  images: {
    recentProjectThumbnail: {
      width: number;
      height: number;
    };
  };
}

export default {
  app: {
    name: 'InOrdnung',
    version: '1.0.0',
  },
  updates: {
    url: 'update url',
  },
  intl: {
    defaultLocale: process.env.REACT_APP_LOCALE || 'en',
  },
  extensions: {
    default: 'inord',
    images: ['jpg', 'jpeg', 'png', 'gif', 'svg'],
  },
  images: {
    recentProjectThumbnail: {
      width: 200,
      height: 200,
    },
  },
} as Config;
