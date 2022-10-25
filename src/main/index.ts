import path from 'path';
import log from 'electron-log';

import './eventsFromRenderer';
import './workers';

import { setupi18n } from '../i18n/main';
import config from '../config';
import createProjectWindow from './windows/project';
import checkForUpdates from './lib/checkForUpdates';
import { launchWorkerWindow } from './lib/workerHelpers';
import { openFile } from '../shared/lib/projectFiles/1-0/main';

let app: Electron.App;

export default (_app: Electron.App): void => {
  app = _app;
  app.setName(config.app.name);

  app.on('window-all-closed', (): void => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('open-file', async (e: Event, path: string): Promise<void> => {
    await openFile(path);
  });

  app.whenReady().then(async (): Promise<void> => {
    setupi18n();

    const initializeAppPath = 'file://' + path.join(__dirname, './workers/initializeApp/index.html');
    launchWorkerWindow(initializeAppPath);

    // Only load the extension on macOS because it doesn't work on any other OS for some reason
    if (process.env.NODE_ENV === 'development' && process.platform === 'darwin') {
      const { default: installExtension, REDUX_DEVTOOLS } = await import('electron-devtools-installer');
      await installExtension(REDUX_DEVTOOLS);
    }

    createProjectWindow();

    setTimeout(() => checkForUpdates(false), 3000);
  }).catch(log.error);
};
