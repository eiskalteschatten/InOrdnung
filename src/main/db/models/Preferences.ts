import {
  Column,
  DataType,
  Default,
  Table,
} from 'sequelize-typescript';
import log from 'electron-log';

import IPreferences from '../../../interfaces/Preferences';
import AbstractModel from './AbstractModel';
import { showGenericErrorDialog } from '../../lib/errorHandling';

export const preferencesId = 1;

export const initialPreferences = {
  automaticallyCheckForUpdates: true,
};

@Table({
  modelName: 'preferences',
  freezeTableName: true,
})
export default class Preferences extends AbstractModel implements IPreferences {
  @Default(initialPreferences.automaticallyCheckForUpdates)
  @Column({
    type: DataType.BOOLEAN,
  })
  automaticallyCheckForUpdates: boolean;
}

export const getPreferences = async (raw = false): Promise<Preferences | null | undefined> => {
  try {
    return await Preferences.findByPk(preferencesId, { raw });
  }
  catch (error) {
    log.error(error);
    showGenericErrorDialog();
  }
};

export const updatePreferences = async (preferences: IPreferences): Promise<void> => {
  try {
    await Preferences.update(preferences, {
      where: {
        id: preferencesId,
      },
    });
  }
  catch (error) {
    log.error(error);
    showGenericErrorDialog();
  }
};
