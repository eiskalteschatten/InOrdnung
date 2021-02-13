import path from 'path';
import { Worker } from 'worker_threads';

import './eventsFromRenderer';

import config from '../config';
import openWelcomeWindow from './windows/welcome';
import { windows } from './windows/project';
import { openFile } from './lib/projectFile';

let app: Electron.App;

const onWindowAllClosed = (): void => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
};

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
};
