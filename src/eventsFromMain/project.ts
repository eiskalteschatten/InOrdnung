import { IpcRendererEvent } from 'electron';

import { ProjectFileMetaData, ProjectFile } from '../shared/interfaces/file';
import { dispatch, getState } from '../store';
import { setFileMetaData } from '../store/entities/file';
import { setProjectInfo } from '../store/entities/project/info';
import { setIsLoading, setPreferences } from '../store/entities/ui';

window.api.on('setProjectFileMetaData', (e: IpcRendererEvent, fileMetaData: ProjectFileMetaData) => {
  const { file } = getState();
  dispatch(setFileMetaData({
    ...file,
    ...fileMetaData,
  }));
});

window.api.on('saveProject', (e: IpcRendererEvent, closeWindow = false) => {
  dispatch(setIsLoading(true));
  const { project, ui, file } = getState();
  window.api.send('saveProject', { project, ui: ui.preferences }, file, closeWindow);
});

window.api.on('saveProjectAs', () => {
  dispatch(setIsLoading(true));
  const { project, ui, file } = getState();
  window.api.send('saveProjectAs', { project, ui: ui.preferences }, file);
});

window.api.on('openProject', (e: IpcRendererEvent, projectFile: ProjectFile, path: string) => {
  dispatch(setProjectInfo(projectFile.project.info));

  dispatch(setPreferences(projectFile.ui));

  dispatch(setFileMetaData({
    path,
    fileLoaded: true,
    saved: true,
  }));

  window.api.send('projectIsEdited', false);
});
