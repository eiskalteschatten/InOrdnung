import path from 'path';
import os from 'os';

export interface Config {
  app: {
    name: string;
    version: string;
    storagePath: string;
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
  welcomeWindow: {
    recentProjectsLimit: number;
  };
}

let storagePath = '';

switch (process.platform) {
  case 'darwin':
    storagePath = path.join(os.homedir(), 'Library', 'Application Support', 'InOrdnung');
    break;
  case 'win32':
    storagePath = path.join(os.homedir(), 'AppData', 'Roaming', 'Alex Seifert', 'InOrdnung');
    break;
  default:
    storagePath = path.join(os.homedir(), '.InOrdnung');
    break;
}

const config: Config = {
  app: {
    name: 'InOrdnung',
    version: '1.0.0-beta.0',
    storagePath,
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
  welcomeWindow: {
    recentProjectsLimit: 5,
  },
};

export default config;
