import { ipcMain } from 'electron';

import createProjectWindow from './windows/project';

ipcMain.on('createNewProject', createProjectWindow);
