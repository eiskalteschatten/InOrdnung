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
      dark: '#222222',
      light: '#f0f0f0',
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
