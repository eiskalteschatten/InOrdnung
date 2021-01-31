import { BrowserWindow, BrowserWindowConstructorOptions, Menu } from 'electron';
import path from 'path';

import initializeRenderer from '../initializeRenderer';
import appMenu from '../menus/welcome';

let window: BrowserWindow | undefined;

export default async (): Promise<void> => {
  if (!window) {
    if (process.env.NODE_ENV === 'development') {
      const { default: installExtension, REDUX_DEVTOOLS } = await import('electron-devtools-installer');
      await installExtension(REDUX_DEVTOOLS);
    }

    const browserWindowOptions: BrowserWindowConstructorOptions = {
      width: 800,
      height: 400,
      resizable: false,
      webPreferences: {
        nodeIntegration: true
      }
    };

    if (process.platform === 'darwin') {
      browserWindowOptions.titleBarStyle = 'hidden';
    }

    window = new BrowserWindow(browserWindowOptions);

    if (window) {
      window.loadURL(
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000'
          : `file://${path.join(__dirname, '../index.html')}`
      );

      window.on('closed', () => {
        window = undefined;
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
