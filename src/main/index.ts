import path from 'path';
import { Worker } from 'worker_threads';
import { autoUpdater, dialog } from 'electron';
import updateElectronApp from 'update-electron-app';

import './eventsFromRenderer';

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

    const worker = new Worker(path.join(__dirname, '/workers/', 'initializeApp.js'));

    worker
      .on('online', (): void => {
        worker.postMessage({});
      })
      .on('error', console.error)
      .on('exit', (code: number): void => {
        console.log(`Worker: initializeApp exited with code ${code}`);
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
    console.error('There was a problem updating the application', error.message);
  });
};
