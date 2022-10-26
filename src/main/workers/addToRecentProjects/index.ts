import { ipcMain, IpcMainEvent } from 'electron';
import fs, { promises as fsPromises } from 'fs';
import path from 'path';
import log from 'electron-log';

import config from '../../../config/main';
import AbstractFileMain from '../../lib/projectFiles/AbstractFileMain';
import { RecentProjectsLocalStorage } from '../../../shared/interfaces/settings';

ipcMain.on('addToRecentProjects', async (e: IpcMainEvent, { projectName, filePath, window }): Promise<void> => {
  const pathToLockFile = path.resolve(config.storagePath, 'recentProjects.lock');

  if (fs.existsSync(pathToLockFile)) {
    log.warn('Cannot update recent projects because the process is locked.');
    process.exit(1);
  }

  await fsPromises.writeFile(pathToLockFile, '', 'utf8');

  const recentProjectsFilePath = path.resolve(config.storagePath, 'recentProjects.json');

  let recentProjects = await AbstractFileMain.getRecentProjects();
  recentProjects = recentProjects.filter((project: RecentProjectsLocalStorage) => project.path !== filePath);

  recentProjects.unshift({
    name: projectName,
    path: filePath,
  });

  if (fs.existsSync(recentProjectsFilePath)) {
    await fsPromises.unlink(recentProjectsFilePath);
  }
  await fsPromises.writeFile(recentProjectsFilePath, JSON.stringify(recentProjects), 'utf8');
  await fsPromises.unlink(pathToLockFile);

  log.info('Project added to recent projects list');

  if (window) {
    window.webContents.send('setRecentProjects', recentProjects);
  }

  e.sender.send('addToRecentProjectsFinished');
});
