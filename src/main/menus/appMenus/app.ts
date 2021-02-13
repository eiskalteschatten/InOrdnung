import { app, BrowserWindow, MenuItem as ElectronMenuItem } from 'electron';

import config from '../../../config';
import { getTranslation } from '../../../lib/helper';
import { MenuItem } from '../menuBuilder';
import openAboutWindow from '../../windows/about';

const translation = getTranslation();

const submenuItems: MenuItem[] = [
  {
    item: {
      label: `${translation.menuAbout} ${config.app.name}`,
      click: (): void => {
        openAboutWindow();
      },
    },
  },
  {
    item: {
      label: translation.menuCheckForUpdates,
      click: (item: ElectronMenuItem, focusedWindow: BrowserWindow | undefined): void => {
        focusedWindow?.webContents.send('check-for-updates');
      },
    },
  },
  { item: { type: 'separator' } },
  { item: { role: 'services', submenu: [] } },
  { item: { type: 'separator' } },
  { item: { role: 'hide' } },
  { item: { role: 'hideOthers' } },
  { item: { role: 'unhide' } },
  { item: { type: 'separator' } },
  { item: { role: 'quit' } },
];

const menuItem: MenuItem = {
  platforms: ['darwin'],
  item: {
    label: app?.getName(),
  },
  submenu: submenuItems,
};

export default menuItem;
