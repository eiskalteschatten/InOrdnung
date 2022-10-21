import { BrowserWindow } from 'electron';

export default (browserWindow: BrowserWindow): void => {
  const { webContents } = browserWindow;

  webContents.send('setPlatform', process.platform);

  webContents.on('did-navigate-in-page', () => {
    webContents.send('setCanGoBack', webContents.canGoBack());
    webContents.send('setCanGoForward', webContents.canGoForward());
  });
};
