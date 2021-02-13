import { BrowserWindow, MenuItem as ElectronMenuItem, shell } from 'electron';

import config from '../../../../config';
import { getTranslation } from '../../../../lib/helper';
import { MenuItem, nonMacPlatforms } from '../../menuBuilder';
import openAboutWindow from '../../../windows/about';

const translation = getTranslation();

const submenuItems: MenuItem[] = [
  {
    platforms: nonMacPlatforms,
    item: {
      label: translation.menuCheckForUpdates,
      click: (item: ElectronMenuItem, focusedWindow?: BrowserWindow): void => {
        focusedWindow?.webContents.send('check-for-updates');
      },
    },
  },
  {
    platforms: nonMacPlatforms,
    item: { type: 'separator' },
  },
  {
    item: {
      label: translation.menuSubmitFeedback,
      click: (): void => {
        shell.openExternal('https://www.alexseifert.com/contact');
      },
    },
  },
  {
    item: {
      label: translation.aboutAlexSeifert,
      click: (): void => {
        shell.openExternal('https://www.alexseifert.com');
      },
    },
  },
  {
    platforms: nonMacPlatforms,
    item: { type: 'separator' },
  },
  {
    platforms: nonMacPlatforms,
    item: {
      label: `${translation.menuAbout} ${config.app.name}`,
      click: (): void => {
        openAboutWindow();
      },
    },
  },
];

const menuItem: MenuItem = {
  item: {
    role: 'help',
  },
  submenu: submenuItems,
};

export default menuItem;
