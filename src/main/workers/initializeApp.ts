import { parentPort } from 'worker_threads';
import fs, { promises as fsPromises } from 'fs';
import path from 'path';

import config from '../../config';

parentPort?.on('message', async (): Promise<void> => {
  if (!fs.existsSync(config.app.storagePath)) {
    await fsPromises.mkdir(config.app.storagePath, { recursive: true });
  }

  const pathToLockFile = path.resolve(config.app.storagePath, 'recentProjects.lock');

  if (fs.existsSync(pathToLockFile)) {
    await fsPromises.unlink(pathToLockFile);
  }

  process.exit(0);
});
