import { ipcMain, IpcMainEvent, BrowserWindow } from 'electron';

ipcMain.on('setWindowTitle', (e: IpcMainEvent, title: string): void => {
  const window = BrowserWindow.fromWebContents(e.sender);
  if (window && title) {
    window.setTitle(title);
    e.sender.send('setTitlebarTitle', title);
  }
});

ipcMain.on('maximizeOrUnmaximizeWindow', (e: IpcMainEvent): void => {
  const window = BrowserWindow.fromWebContents(e.sender);

  if (window?.isMaximized) {
    window.maximize();
  }
  else {
    window?.unmaximize();
  }
});
