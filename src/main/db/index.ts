import { Sequelize } from 'sequelize-typescript';
import path from 'path';
// import { setupMigration, migrate } from 'sequelize-migration-wrapper';
import log from 'electron-log';
import fs from 'fs';

import config from '../../config/main';
import models from './models';
import Preferences, { initialPreferences, getPreferences } from './models/Preferences';

const sequelizeLog = log.scope('sequelize');

export const storage = path.resolve(config.storagePath, 'mailcoach.sqlite');

const fillInInitialValues = async (): Promise<void> => {
  const preferences = await getPreferences();

  if (!preferences) {
    await Preferences.create(initialPreferences);
  }
};

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage,
  models,
  logging: process.env.NODE_ENV === 'development' ? sequelizeLog.info : undefined,
  sync: {
    alter: true,
  },
});

export default sequelize;

// setupMigration({
//   sequelize,
//   path: path.resolve(__dirname, './migrations'),
//   filePattern: /\.ts|\.js$/,
// });

export async function setupSequelize(): Promise<Sequelize> {
  try {
    const dbFileExists = fs.existsSync(storage);

    await sequelize.authenticate();
    log.info('Connection to the database has been established successfully.');

    if (process.env.SYNC_DB || !dbFileExists) {
      log.info('Synchronizing the database because no file was found or SYNC_DB was set to true...');
      await sequelize.sync();
    }

    // if (process.env.DISABLE_DB_MIGRATION !== 'true') {
    //   await migrate();
    // }

    await fillInInitialValues();

    log.info('Database migration scripts successfully executed.');
  }
  catch (error) {
    log.error('Unable to connect to the database:', error);
  }

  return sequelize;
}
