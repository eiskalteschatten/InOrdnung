import { app, shell, MenuItemConstructorOptions, MenuItem, BrowserWindow } from 'electron';

import config from '../../config';
import { getTranslation } from '../../lib/helper';
import createWindow from '../windows/project';
import openWelcomeWindow from '../windows/welcome';
import openAboutWindow from '../windows/about';
import { openFileDialog, saveFileAs } from '../lib/projectFile';

const translation = getTranslation();

const template: MenuItemConstructorOptions[] = [
  {
    label: translation.file,
    submenu: [
      {
        label: translation.menuNewProject,
        accelerator: 'CmdOrCtrl+N',
        click: async (): Promise<void> => {
          await createWindow();
        },
      },
      {
        label: translation.menuOpen,
        accelerator: 'CmdOrCtrl+O',
        click: async (): Promise<void> => {
          await openFileDialog();
        },
      },
      {
        label: translation.menuOpenRecent,
        role: 'recentDocuments',
        submenu:[
          {
            label: translation.menuClearMenu,
            role: 'clearRecentDocuments',
          },
        ],
      },
      { type: 'separator' },
      { role: 'close' },
      {
        label: translation.menuSave,
        accelerator: 'CmdOrCtrl+S',
        click: (item: MenuItem, focusedWindow?: BrowserWindow): void => {
          focusedWindow?.webContents.send('saveProject');
        },
      },
      {
        label: translation.menuSaveAs,
        accelerator: 'CmdOrCtrl+Shift+S',
        click: async (item: MenuItem, focusedWindow?: BrowserWindow): Promise<void> => {
          if (focusedWindow) {
            await saveFileAs(focusedWindow);
          }
        },
      },
    ],
  },
  {
    label: translation.edit,
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'pasteAndMatchStyle' },
      { role: 'delete' },
      { role: 'selectAll' },
    ],
  },
  {
    label: translation.view,
    submenu: [
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' },
      { type: 'separator' },
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
        label: translation.welcomeToInOrdung,
        click: (): void => {
          openWelcomeWindow();
        },
      },
      { type: 'separator' },
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
    label: app.getName(),
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
      { type: 'separator' },
      {
        label: translation.preferences,
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
      label: translation.preferences,
      accelerator: 'Ctrl+,',
      click: (item: MenuItem, focusedWindow: BrowserWindow | undefined): void => {
        focusedWindow?.webContents.send('open-preferences');
      },
    }
  );


  // Help menu
  const helpMenu = template[4].submenu as MenuItemConstructorOptions[];
  template[4].submenu = [
    helpMenu[0],
    {
      label: translation.menuCheckForUpdates,
      click: (item: MenuItem, focusedWindow: BrowserWindow | undefined): void => {
        focusedWindow?.webContents.send('check-for-updates');
      },
    },
    { type: 'separator' },
    helpMenu[2],
    { type: 'separator' },
    helpMenu[3],
    {
      label: `${translation.menuAbout} ${config.app.name}`,
      click: (): void => {
        openAboutWindow();
      },
    },
  ];
}

export default template;
