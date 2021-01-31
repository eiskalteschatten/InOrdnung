import { BrowserWindow, BrowserWindowConstructorOptions, Menu } from 'electron';
import path from 'path';

import initializeRenderer from '../initializeRenderer';
import welcomeMenu from '../../menus/welcome';

let welcomeWindow: BrowserWindow | null;

export default async (): Promise<void> => {
  if (!welcomeWindow) {
    if (process.env.NODE_ENV === 'development') {
      const { default: installExtension, REDUX_DEVTOOLS } = await import('electron-devtools-installer');
      await installExtension(REDUX_DEVTOOLS);
    }

    const browserWindowOptions: BrowserWindowConstructorOptions = {
      width: 900,
      height: 500,
      resizable: false,
      webPreferences: {
        nodeIntegration: true
      }
    };

    if (process.platform === 'darwin') {
      browserWindowOptions.titleBarStyle = 'hidden';
    }

    welcomeWindow = new BrowserWindow(browserWindowOptions);

    if (welcomeWindow) {
      welcomeWindow.loadURL(
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000'
          : `file://${path.join(__dirname, '../index.html')}`
      );

      welcomeWindow.on('closed', () => {
        welcomeWindow = null;
      });

      welcomeWindow.webContents.on('did-finish-load', (): void => {
        if (welcomeWindow) {
          initializeRenderer(welcomeWindow);
        }
      });

      welcomeWindow.on('focus', () => {
        const menu = Menu.buildFromTemplate(welcomeMenu);
        Menu.setApplicationMenu(menu);
      });
    }
  }
};
