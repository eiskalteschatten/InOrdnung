import { shell, MenuItemConstructorOptions, MenuItem, BrowserWindow } from 'electron';

import menuBuilder from '../../menuBuilder';
import appMenuItems from '../app';
import fileMenuItems from './file';
import editMenuItems from '../edit';

import config from '../../../../config';
import { getTranslation } from '../../../../lib/helper';
import openAboutWindow from '../../../windows/about';

const translation = getTranslation();

const template: MenuItemConstructorOptions[] = [
  menuBuilder(appMenuItems),
  menuBuilder(fileMenuItems),
  menuBuilder(editMenuItems),
  {
    label: translation.view,
    submenu: [
      {
        label: translation.menuDevelopment,
        submenu: [
          { role: 'reload' },
          { role: 'forceReload' },
          { role: 'toggleDevTools' },
        ],
      },
    ],
  },
  {
    role: 'window',
    submenu: [
      { role: 'minimize' },
    ],
  },
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
  // Window menu
  template[4].submenu = [
    { role: 'minimize' },
    { role: 'zoom' },
    { type: 'separator' },
    { role: 'front' },
  ];
}
else {
  // Edit menu
  // (template[1].submenu as MenuItemConstructorOptions[]).push(
  //   { type: 'separator' },
  //   {
  //     label: translation.preferences,
  //     accelerator: 'Ctrl+,',
  //     click: (item: MenuItem, focusedWindow: BrowserWindow | undefined): void => {
  //       focusedWindow?.webContents.send('open-preferences');
  //     },
  //   }
  // );


  // Help menu
  const helpMenu = template[4].submenu as MenuItemConstructorOptions[];
  template[4].submenu = [
    {
      label: translation.menuCheckForUpdates,
      click: (item: MenuItem, focusedWindow: BrowserWindow | undefined): void => {
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
