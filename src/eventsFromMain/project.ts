import { IpcRendererEvent } from 'electron';

import { ProjectFileMetaData, ProjectFile } from '../interfaces/project';
import { getState, dispatch } from '../store';
import { projectSetProject } from '../store/actions/projectActions';
import { fileSetMetaData } from '../store/actions/fileActions';
import { uiSetPreferences } from '../store/actions/uiActions';

window.api.on('setProjectFileMetaData', (e: IpcRendererEvent, fileMetaData: ProjectFileMetaData): void => {
  const state = getState();
  dispatch(fileSetMetaData({
    ...state.file,
    ...fileMetaData,
  }));
});

window.api.on('saveProject', (e: IpcRendererEvent, closeWindow = false): void => {
  const { project, ui, file } = getState();
  window.api.send('saveProject', { project, ui }, file, closeWindow);
});

window.api.on('openProject', (e: IpcRendererEvent, projectFile: ProjectFile, path: string): void => {
  dispatch(projectSetProject(projectFile.project));
  dispatch(uiSetPreferences(projectFile.ui));
  dispatch(fileSetMetaData({
    path,
    fileLoaded: true,
    saved: true,
  }));
});
