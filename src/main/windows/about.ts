import { BrowserWindow, BrowserWindowConstructorOptions, Menu, nativeTheme } from 'electron';
import path from 'path';

import initializeRenderer from '../initializeRenderer';
import appMenu from '../appMenus/welcome';

let window: BrowserWindow | undefined;

export default async (): Promise<void> => {
  if (!window) {
    const browserWindowOptions: BrowserWindowConstructorOptions = {
      width: 450,
      height: 250,
      resizable: false,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
      },
      backgroundColor: nativeTheme.shouldUseDarkColors ? '#222222' : '#f0f0f0',
    };

    window = new BrowserWindow(browserWindowOptions);

    if (window) {
      window.loadURL(
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/about'
          : `file://${path.join(__dirname, '../index.html#about')}`
      );

      window.on('closed', () => {
        window = undefined;
      });

      window.webContents.on('did-finish-load', (): void => {
        if (window) {
          initializeRenderer(window);
          window.webContents.send('processVersions', process.versions);
        }
      });

      if (process.platform === 'darwin') {
        window.on('focus', () => {
          const menu = Menu.buildFromTemplate(appMenu);
          Menu.setApplicationMenu(menu);
        });
      }
    }
  }
  else {
    window.focus();
  }
};
