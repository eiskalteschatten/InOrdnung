import { IpcRendererEvent } from 'electron';

import { FileStoreMetaData } from '../shared/interfaces/fileMetaData';
import { ProjectFile } from '../shared/lib/projectFiles/1-0/interfaces';
import { serializeProjectForSaving, setProjectFromFile } from '../shared/lib/projectFiles/1-0/renderer';
import { dispatch, getState } from '../store';
import { setFileMetaData } from '../store/entities/file';
import { setIsLoading } from '../store/entities/ui/session';

window.api.on('setProjectFileMetaData', (e: IpcRendererEvent, fileMetaData: FileStoreMetaData) => {
  const { file } = getState();
  dispatch(setFileMetaData({
    ...file,
    ...fileMetaData,
  }));
});

window.api.on('saveProject', (e: IpcRendererEvent, closeWindow = false) => {
  dispatch(setIsLoading(true));
  const { file } = getState();
  window.api.send('saveProject', serializeProjectForSaving(), file, closeWindow);
});

window.api.on('saveProjectAs', () => {
  dispatch(setIsLoading(true));
  const { file } = getState();
  window.api.send('saveProjectAs', serializeProjectForSaving(), file);
});

window.api.on('openProject', (e: IpcRendererEvent, projectFile: ProjectFile, path: string) => {
  setProjectFromFile(projectFile, path);
  window.api.send('projectIsEdited', false);
});
