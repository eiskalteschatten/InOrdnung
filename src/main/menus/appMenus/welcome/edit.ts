// import { BrowserWindow, MenuItem as ElectronMenuItem } from 'electron';

import { getTranslation } from '../../../lib/helper';
import { MenuItem } from '../../menuBuilder';

const translation = getTranslation();

const submenuItems: MenuItem[] = [
  { item: { role: 'cut' } },
  { item: { role: 'copy' } },
  { item: { role: 'paste' } },
  {
    platforms: ['darwin'],
    item: { type: 'separator' },
  },
  {
    platforms: ['darwin'],
    item: {
      label: 'Speech',
    },
    submenu: [
      { item: { role: 'startSpeaking' } },
      { item: { role: 'stopSpeaking' } },
    ],
  },
  // {
  //   platforms: nonMacPlatforms,
  //   item: { type: 'separator' },
  // },
  // {
  //   platforms: nonMacPlatforms,
  //   item: {
  //     label: translation.preferences,
  //     accelerator: 'Ctrl+,',
  //     click: (item: ElectronMenuItem, focusedWindow?: BrowserWindow): void => {
  //       focusedWindow?.webContents.send('open-preferences');
  //     },
  //   },
  // },
];

const menuItem: MenuItem = {
  item: {
    label: translation.edit,
  },
  submenu: submenuItems,
};

export default menuItem;
