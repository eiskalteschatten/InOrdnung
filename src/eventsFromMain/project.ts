import { IpcRendererEvent } from 'electron';

import { FileStoreMetaData } from '../shared/interfaces/fileMetaData';
import { ProjectFile } from '../shared/lib/projectFiles/1-0/interfaces';
import { dispatch, getState } from '../store';
import { setFileMetaData } from '../store/entities/file';
import getFileRendererInstance from '../shared/lib/projectFiles';

window.api.on('setProjectFileMetaData', (e: IpcRendererEvent, fileMetaData: FileStoreMetaData) => {
  const { file } = getState();
  dispatch(setFileMetaData({
    ...file,
    ...fileMetaData,
  }));
});

window.api.on('saveProject', async (e: IpcRendererEvent, closeWindow = false) => {
  const { file } = getState();
  const fileClass = await getFileRendererInstance();
  window.api.send('saveProject', fileClass.serializeProjectForSaving(), file, closeWindow);
});

window.api.on('saveProjectAs', async () => {
  const { file } = getState();
  const fileClass = await getFileRendererInstance();
  window.api.send('saveProjectAs', fileClass.serializeProjectForSaving(), file);
});

window.api.on('openProject', async (e: IpcRendererEvent, projectFile: ProjectFile, path: string) => {
  const fileClass = await getFileRendererInstance();
  fileClass.setProjectFromFile(projectFile, path);
  window.api.send('projectIsEdited', false);
});
