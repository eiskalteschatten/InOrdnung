import { BrowserWindow, BrowserWindowConstructorOptions, Menu, nativeTheme } from 'electron';
import path from 'path';

import initializeRenderer from '../initializeRenderer';
import appMenu from '../menus/appMenus/welcome';

let window: BrowserWindow | undefined;

export default async (): Promise<void> => {
  if (!window) {
    const browserWindowOptions: BrowserWindowConstructorOptions = {
      width: 450,
      height: 250,
      resizable: false,
      icon: path.join(__dirname, '../../assets/images/icon128.png'),
      webPreferences: {
        contextIsolation: true,
        preload: path.join(__dirname, '../preload.js'),
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
      else {
        window.setMenuBarVisibility(false);
      }
    }
  }
  else {
    window.focus();
  }
};
