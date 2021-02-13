import { app, shell, MenuItemConstructorOptions, MenuItem, BrowserWindow } from 'electron';

import fileMenu from './file';

import config from '../../../../config';
import { getTranslation } from '../../../../lib/helper';
import openAboutWindow from '../../../windows/about';

const translation = getTranslation();

const template: MenuItemConstructorOptions[] = [
  fileMenu,
  {
    label: translation.edit,
    submenu: [
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'pasteAndMatchStyle' },
    ],
  },
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
  template.unshift({
    label: app?.getName(),
    submenu: [
      {
        label: `${translation.menuAbout} ${config.app.name}`,
        click: (): void => {
          openAboutWindow();
        },
      },
      {
        label: translation.menuCheckForUpdates,
        click: (item: MenuItem, focusedWindow: BrowserWindow | undefined): void => {
          focusedWindow?.webContents.send('check-for-updates');
        },
      },
      // { type: 'separator' },
      // {
      //   label: translation.preferences,
      //   accelerator: 'Cmd+,',
      //   click: (item: MenuItem, focusedWindow: BrowserWindow | undefined): void => {
      //     focusedWindow?.webContents.send('open-preferences');
      //   },
      // },
      { type: 'separator' },
      { role: 'services', submenu: [] },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideOthers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' },
    ],
  });

  // Edit menu
  (template[2].submenu as MenuItemConstructorOptions[]).push(
    { type: 'separator' },
    {
      label: 'Speech',
      submenu: [
        { role: 'startSpeaking' },
        { role: 'stopSpeaking' },
      ],
    }
  );

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
