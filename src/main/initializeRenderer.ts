import { BrowserWindow } from 'electron';
import AbstractFileMain from './lib/projectFiles/AbstractFileMain';

export default async (browserWindow: BrowserWindow) => {
  const { webContents } = browserWindow;

  webContents.send('setPlatform', process.platform);

  webContents.on('did-navigate-in-page', () => {
    webContents.send('setCanGoBack', webContents.canGoBack());
    webContents.send('setCanGoForward', webContents.canGoForward());
  });

  await AbstractFileMain.getRecentProjects(webContents);
};
