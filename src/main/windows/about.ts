import { BrowserWindow, BrowserWindowConstructorOptions, Menu } from 'electron';
import path from 'path';

import initializeRenderer from '../initializeRenderer';
import appMenu from '../../menus/welcome';

let window: BrowserWindow | null;

export default async (): Promise<void> => {
  if (!window) {
    const browserWindowOptions: BrowserWindowConstructorOptions = {
      width: 250,
      height: 200,
      resizable: false,
      webPreferences: {
        nodeIntegration: true
      }
    };

    window = new BrowserWindow(browserWindowOptions);

    if (window) {
      window.loadURL(
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/about'
          : `file://${path.join(__dirname, '../index.html#about')}`
      );

      window.on('closed', () => {
        window = null;
      });

      window.webContents.on('did-finish-load', (): void => {
        if (window) {
          initializeRenderer(window);
        }
      });

      window.on('focus', () => {
        const menu = Menu.buildFromTemplate(appMenu);
        Menu.setApplicationMenu(menu);
      });
    }
  }
  else {
    window.focus();
  }
};
