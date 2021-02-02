import './eventsFromRenderer';

import config from '../config';
import openWelcomeWindow from './windows/welcome';
import { windows } from './windows/project';

let app: Electron.App;

const onWindowAllClosed = (): void => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
};

export default (_app: Electron.App): void => {
  app = _app;
  app.on('window-all-closed', onWindowAllClosed);
  app.setName(config.app.name);

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
};
