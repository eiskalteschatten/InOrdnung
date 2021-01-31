import { app, shell, MenuItemConstructorOptions, MenuItem, BrowserWindow } from 'electron';

import config from '../config';
import createProjectWindow from '../main/windows/project';
import openAboutWindow from '../main/windows/about';

const template: MenuItemConstructorOptions[] = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New Project',
        accelerator: 'CmdOrCtrl+N',
        click: (): void => {
          createProjectWindow();
        },
      },
      { type: 'separator' },
      { role: 'close' },
    ],
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'pasteAndMatchStyle' },
    ],
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Advanced',
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
        label: 'Submit Feedback',
        click: (): void => {
          shell.openExternal('https://www.alexseifert.com/contact');
        },
      },
      {
        label: 'About Alex Seifert',
        click: (): void => {
          shell.openExternal('https://www.alexseifert.com');
        },
      },
    ],
  },
];

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      {
        label: `About ${config.app.name}`,
        click: (): void => {
          openAboutWindow();
        },
      },
      {
        label: 'Check for Updates...',
        click: (item: MenuItem, focusedWindow: BrowserWindow | undefined): void => {
          focusedWindow?.webContents.send('check-for-updates');
        },
      },
      { type: 'separator' },
      {
        label: 'Preferences',
        accelerator: 'Cmd+,',
        click: (item: MenuItem, focusedWindow: BrowserWindow | undefined): void => {
          focusedWindow?.webContents.send('open-preferences');
        },
      },
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
  (template[1].submenu as MenuItemConstructorOptions[]).push(
    { type: 'separator' },
    {
      label: 'Preferences',
      accelerator: 'Ctrl+,',
      click: (item: MenuItem, focusedWindow: BrowserWindow | undefined): void => {
        focusedWindow?.webContents.send('open-preferences');
      },
    }
  );


  // Help menu
  const helpMenu = template[4].submenu as MenuItemConstructorOptions[];
  template[4].submenu = [
    {
      label: 'Check for Updates...',
      click: (item: MenuItem, focusedWindow: BrowserWindow | undefined): void => {
        focusedWindow?.webContents.send('check-for-updates');
      },
    },
    { type: 'separator' },
    helpMenu[0],
    { type: 'separator' },
    helpMenu[1],
    {
      label: `About ${config.app.name}`,
      click: (): void => {
        openAboutWindow();
      },
    },
  ];
}

export default template;
