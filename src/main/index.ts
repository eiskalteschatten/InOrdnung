import path from 'path';
import { autoUpdater, BrowserWindow, dialog } from 'electron';
import updateElectronApp from 'update-electron-app';
import log from 'electron-log';

import './eventsFromRenderer';
import './workers';

import config from '../config';
import openWelcomeWindow from './windows/welcome';
import { windows } from './windows/project';
import { openFile } from './lib/projectFile';
import { getTranslation } from '../lib/helper';


updateElectronApp();

let app: Electron.App;

const onWindowAllClosed = (): void => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
};

const translation = getTranslation();

export default (_app: Electron.App): void => {
  app = _app;
  app.setName(config.app.name);

  app.on('window-all-closed', onWindowAllClosed);

  app.on('activate', (e: Event, hasVisibleWindows: boolean): void => {
    if (!hasVisibleWindows) {
      openWelcomeWindow();
    }
  });

  app.on('open-file', async (e: Event, path: string): Promise<void> => {
    await openFile(path);
  });

  app.on('ready', async (): Promise<void> => {
    if (windows.size === 0) {
      openWelcomeWindow();
    }

    const initializeAppPath = 'file://' + path.join(__dirname, '/workers/', 'initializeApp.html');

    const initializeApp = new BrowserWindow({
      width: 400,
      height: 400,
      show: false,
      webPreferences: {
        contextIsolation: true,
        preload: path.join(__dirname, './preload.js'),
      },
    });

    initializeApp.loadURL(initializeAppPath);
    initializeApp.webContents.on('did-finish-load', () => {
    });

    if (process.env.NODE_ENV === 'development') {
      const { default: installExtension, REDUX_DEVTOOLS } = await import('electron-devtools-installer');
      await installExtension(REDUX_DEVTOOLS);
    }
  });

  autoUpdater.on('update-downloaded', async (event: Event, releaseNotes: string, releaseName: string): Promise<void> => {
    const result = await dialog.showMessageBox({
      type: 'info',
      buttons: [translation.restart, translation.later],
      title: translation.updateAvailable,
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail: translation.newVersionRestart,
    });

    if (result.response === 0) {
      autoUpdater.quitAndInstall();
    }
  });

  autoUpdater.on('error', (error: Error): void => {
    log.error('There was a problem updating the application', error.message);
  });
};
