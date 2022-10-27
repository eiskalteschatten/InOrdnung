import { ipcMain, IpcMainEvent, dialog, shell, BrowserWindow, Menu } from 'electron';
import log from 'electron-log';

import { showGenericErrorDialog } from '../lib/errorHandling';
import appMenu from '../menus/appMenus/main';

type AlertTypes = 'none' | 'info' | 'error' | 'question' | 'warning';

interface AlertOptions {
  type: AlertTypes;
  message: string;
  detail?: string;
  buttons: string[];
}

ipcMain.on('openAlert', async (e: IpcMainEvent, options: AlertOptions, responseEvent?: string): Promise<void> => {
  try {
    const result = await dialog.showMessageBox({
      message: options.message,
      detail: options.detail,
      buttons: options.buttons,
      type: options.type,
      defaultId: 0,
      cancelId: 0,
    });

    if (result.response === 1 && responseEvent) {
      e.sender.send(responseEvent);
    }

    e.returnValue = result.response;
  }
  catch (error) {
    log.error(error);
    showGenericErrorDialog();
  }
});

ipcMain.on('openLink', async (e: IpcMainEvent, link: string): Promise<void> => shell.openExternal(link));

ipcMain.on('openAppMenu', (e: IpcMainEvent): void => {
  const window = BrowserWindow.fromWebContents(e.sender) || undefined;
  const menu = Menu.buildFromTemplate(appMenu());
  menu?.popup({ window });
});
