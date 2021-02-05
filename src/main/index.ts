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

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (windows.size === 0) {
      openWelcomeWindow();
    }
  });

  app.on('did-become-active', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (windows.size === 0) {
      openWelcomeWindow();
    }
  });

  app.on('open-file', async (e: Event, path: string): Promise<void> => {
    await openFile(path);
  });

  app.on('ready', () => {
    const worker = new Worker(path.join(__dirname, '/workers/', 'initializeApp.js'));

    worker
      .on('online', (): void => {
        worker.postMessage({});
      })
      .on('error', console.error)
      .on('exit', (code: number): void => {
        console.log(`Worker: initializeApp exited with code ${code}`);
      });
  });
};
