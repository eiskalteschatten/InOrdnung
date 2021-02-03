import { BrowserWindow, dialog } from 'electron';
import { promises as fsPromises } from 'fs';

import config from '../../config';
import { ProjectFile, ProjectFileMetaData } from '../../interfaces/project';
import { getTranslation } from '../../lib/helper';

const translation = getTranslation();

export const saveFileAs = async (window: BrowserWindow): Promise<void> => {
  const { filePath, canceled } = await dialog.showSaveDialog(window, {
    filters: [
      { name: translation.projectInOrdnungProjectFile, extensions: [config.extensions.default] },
    ],
  });

  if (!canceled) {
    window.setRepresentedFilename(filePath || '');
    window.webContents.send('setProjectFileMetaData', { path: filePath });
    window.webContents.send('saveProject');
  }
};

export const writeFile = async (project: ProjectFile, fileMetaData: ProjectFileMetaData, window: BrowserWindow): Promise<void> => {
  try {
    if (!fileMetaData.path) {
      await saveFileAs(window);
    }
    else {
      await fsPromises.writeFile(fileMetaData.path, JSON.stringify(project), 'utf8');

      window.webContents.send('setProjectFileMetaData', {
        ...fileMetaData,
        saved: true,
        fileLoaded: true,
      });

      window.setDocumentEdited(false);
    }
  }
  catch (error) {
    console.error(error);
  }
};
