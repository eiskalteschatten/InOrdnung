import { parentPort } from 'worker_threads';
import fs, { promises as fsPromises } from 'fs';
import path from 'path';

import { createThumbnail } from '../lib/images';
import config from '../../config';
import { RecentProjectsLocalStorage } from '../../interfaces/project';

parentPort?.on('message', async ({ filePath, image, mimeType }): Promise<void> => {
  const thumbnail = image ? await createThumbnail(image) : undefined;
  const recentProjectsFilePath = path.resolve(config.app.storagePath, 'recentProjects.json');

  const recentProjectsString = fs.existsSync(recentProjectsFilePath)
    ? await fsPromises.readFile(recentProjectsFilePath, 'utf8')
    : '';

  let recentProjects: RecentProjectsLocalStorage[] = recentProjectsString ? JSON.parse(recentProjectsString) : [];
  recentProjects = recentProjects.filter((project: RecentProjectsLocalStorage) => project.path === filePath);

  recentProjects.unshift({
    path: filePath,
    thumbnail,
    thumbnailMimeType: mimeType,
  });

  await fsPromises.writeFile(recentProjectsFilePath, JSON.stringify(recentProjects), 'utf8');

  process.exit(0);
});
