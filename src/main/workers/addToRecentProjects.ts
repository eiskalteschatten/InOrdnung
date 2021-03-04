import { parentPort } from 'worker_threads';
import fs, { promises as fsPromises } from 'fs';
import path from 'path';
import log from 'electron-log';

import { createThumbnail } from '../lib/images';
import config from '../../config';
import { RecentProjectsLocalStorage } from '../../interfaces/project';
import { getRecentProjects } from '../lib/projectFile';


parentPort?.on('message', async ({ projectName, filePath, image, mimeType }): Promise<void> => {
  const pathToLockFile = path.resolve(config.app.storagePath, 'recentProjects.lock');

  if (fs.existsSync(pathToLockFile)) {
    log.warn('Cannot update recent projects because the process is locked.');
    process.exit(1);
  }

  await fsPromises.writeFile(pathToLockFile, '', 'utf8');

  const thumbnail = image ? await createThumbnail(image) : undefined;
  const recentProjectsFilePath = path.resolve(config.app.storagePath, 'recentProjects.json');

  let recentProjects = await getRecentProjects();
  recentProjects = recentProjects.filter((project: RecentProjectsLocalStorage) => project.path !== filePath);

  recentProjects.unshift({
    name: projectName,
    path: filePath,
    thumbnail,
    thumbnailMimeType: mimeType,
  });

  if (recentProjects.length > 5) {
    recentProjects = recentProjects.slice(0, config.welcomeWindow.recentProjectsLimit);
  }

  await fsPromises.writeFile(recentProjectsFilePath, JSON.stringify(recentProjects), 'utf8');
  await fsPromises.unlink(pathToLockFile);

  process.exit(0);
});
