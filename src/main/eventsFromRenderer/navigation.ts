import { ipcMain, IpcMainEvent } from 'electron';

ipcMain.on('navigateBack', async (e: IpcMainEvent): Promise<void> => e.sender.goBack());
ipcMain.on('navigateForward', async (e: IpcMainEvent): Promise<void> => e.sender.goForward());
