import { app, BrowserWindow, dialog } from 'electron';
import { promises as fsPromises } from 'fs';
import path from 'path';
import os from 'os';
import log from 'electron-log';

import i18n from '../../../../i18n/main';
import { FileStoreMetaData } from '../../../../shared/interfaces/fileMetaData';
import config from '../../../../config/main';
import AbstractFileMain from '../AbstractFileMain';

import fileVersion from '../../../../shared/lib/projectFiles/1-0/fileVersion';
import { ProjectFile } from '../../../../shared/lib/projectFiles/1-0/interfaces';

const { t } = i18n;

export default class FileMain extends AbstractFileMain<ProjectFile> {
  async saveFileAs(projectFile: ProjectFile, fileMetaData: FileStoreMetaData, window: BrowserWindow) {
    const { filePath, canceled } = await dialog.showSaveDialog(window, {
      filters: [
        { name: t('files:inOrdnungProjectFile'), extensions: [config.extensions.default] },
      ],
    });

    if (!canceled) {
      window.setRepresentedFilename(filePath || '');

      const writeFileMetaData = {
        ...fileMetaData,
        path: filePath || '',
      };

      await this.writeFile(projectFile, writeFileMetaData, window);
    }
  }

  async writeFile(projectFile: ProjectFile, fileMetaData: FileStoreMetaData, window: BrowserWindow) {
    try {
      if (!fileMetaData.path) {
        throw new Error('No file path can be found for writing!');
      }
      else {
        const tempDir = os.tmpdir();
        const fileName = path.parse(fileMetaData.path).name;
        const tempFilePath = path.join(tempDir, `${fileName}.${config.extensions.default}.temp`);

        const dataToSave = {
          fileVersion,
          ...projectFile,
        };

        await fsPromises.writeFile(tempFilePath, JSON.stringify(dataToSave), 'utf8');
        await this.zipFile(tempFilePath, fileMetaData.path);
        fsPromises.unlink(tempFilePath);

        window.webContents.send('setProjectFileMetaData', {
          ...fileMetaData,
          saved: true,
          fileLoaded: true,
        });

        window.setDocumentEdited(false);
        app.addRecentDocument(fileMetaData.path);

        await AbstractFileMain.addToRecentProjects(
          fileMetaData.path,
          projectFile.project.info.name
        );
      }
    }
    catch (error) {
      log.error(error);
    }
  }
}
