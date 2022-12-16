import path from 'path';
import os from 'os';

import globalConfig from './index';

let storagePath = '';

switch (process.platform) {
  case 'darwin':
    storagePath = path.join(os.homedir(), 'Library', 'Application Support', 'InOrdnung');
    break;
  case 'win32':
    storagePath = path.join(os.homedir(), 'AppData', 'Roaming', 'InOrdnung');
    break;
  default:
    storagePath = path.join(os.homedir(), '.inordnung');
    break;
}

export default {
  windows: {
    defaultBackgroundColors: {
      dark: '#0a0e11',
      light: '#f0f0f0',
    },
    defaultForegroundColors: {
      dark: '#f0f0f0',
      light: '#222222',
    },
    titleBarOverlayColors: {
      dark: '#222a2e',
      light: '#ffffff',
    },
  },
  storagePath,
  updates: {
    url: 'https://api.github.com/repos/eiskalteschatten/InOrdnung/releases',
  },
  extensions: {
    default: 'inord',
    images: ['jpg', 'jpeg', 'png', 'gif', 'svg'],
  },
  ...globalConfig,
};
