import { BrowserWindow } from 'electron';

export default async (browserWindow: BrowserWindow, openWelcomeDialog?: boolean) => {
  const { webContents } = browserWindow;

  webContents.send('setPlatform', process.platform);

  webContents.on('did-navigate-in-page', () => {
    webContents.send('setCanGoBack', webContents.canGoBack());
    webContents.send('setCanGoForward', webContents.canGoForward());
  });

  webContents.send('setOpenWelcomeDialog', openWelcomeDialog ?? false);
};
