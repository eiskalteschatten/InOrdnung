import { parentPort } from 'worker_threads';
import fs, { promises as fsPromises } from 'fs';

import config from '../../config';

parentPort?.on('message', async (): Promise<void> => {
  if (!fs.existsSync(config.app.storagePath)) {
    await fsPromises.mkdir(config.app.storagePath, { recursive: true });
  }

  process.exit(0);
});
