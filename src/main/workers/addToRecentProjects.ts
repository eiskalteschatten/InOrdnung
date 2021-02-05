import { parentPort } from 'worker_threads';
import { promises as fsPromises } from 'fs';
import path from 'path';

import { createThumbnail } from '../lib/images';
import config from '../../config';
import { RecentProjectsLocalStorage } from '../../interfaces/project';
import { getRecentProjects } from '../lib/projectFile';

parentPort?.on('message', async ({ projectName, filePath, image, mimeType }): Promise<void> => {
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

  await fsPromises.writeFile(recentProjectsFilePath, JSON.stringify(recentProjects), 'utf8');
  process.exit(0);
});
