import { shell, MenuItemConstructorOptions, MenuItem, BrowserWindow } from 'electron';

import menuBuilder from '../../menuBuilder';
import appMenuItems from './app';
import fileMenuItems from './file';
import editMenuItems from './edit';
import viewMenuItems from './view';
import windowMenuItems from './window';

import config from '../../../../config';
import { getTranslation } from '../../../../lib/helper';
import openAboutWindow from '../../../windows/about';

const translation = getTranslation();

const template: MenuItemConstructorOptions[] = [
  menuBuilder(fileMenuItems),
  menuBuilder(editMenuItems),
  menuBuilder(viewMenuItems),
  menuBuilder(windowMenuItems),
  {
    role: 'help',
    submenu: [
      {
        label: translation.menuSubmitFeedback,
        click: (): void => {
          shell.openExternal('https://www.alexseifert.com/contact');
        },
      },
      {
        label: translation.aboutAlexSeifert,
        click: (): void => {
          shell.openExternal('https://www.alexseifert.com');
        },
      },
    ],
  },
];

if (process.platform === 'darwin') {
  template.unshift(menuBuilder(appMenuItems));
}
else {
  // Help menu
  const helpMenu = template[4].submenu as MenuItemConstructorOptions[];
  template[4].submenu = [
    {
      label: translation.menuCheckForUpdates,
      click: (item: MenuItem, focusedWindow?: BrowserWindow): void => {
        focusedWindow?.webContents.send('check-for-updates');
      },
    },
    { type: 'separator' },
    helpMenu[0],
    { type: 'separator' },
    helpMenu[1],
    {
      label: `${translation.menuAbout} ${config.app.name}`,
      click: (): void => {
        openAboutWindow();
      },
    },
  ];
}

export default template;
