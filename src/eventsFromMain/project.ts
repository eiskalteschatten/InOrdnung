import { IpcRendererEvent } from 'electron';

import { ProjectFileMetaData, ProjectFile } from '../interfaces/project';
import { getState, dispatch } from '../store';
import { projectSetProject } from '../store/actions/projectActions';
import { fileSetMetaData } from '../store/actions/fileActions';

const { ipcRenderer } = window.require('electron');

ipcRenderer.on('setProjectFileMetaData', (e: IpcRendererEvent, fileMetaData: ProjectFileMetaData): void => {
  const state = getState();
  dispatch(fileSetMetaData({
    ...state.file,
    ...fileMetaData,
  }));
});

ipcRenderer.on('saveProject', (e: IpcRendererEvent, closeWindow = false): void => {
  const { project, file } = getState();
  ipcRenderer.send('saveProject', { project }, file, closeWindow);
});

ipcRenderer.on('openProject', (e: IpcRendererEvent, projectFile: ProjectFile, path: string): void => {
  dispatch(projectSetProject(projectFile.project));
  dispatch(fileSetMetaData({
    path,
    fileLoaded: true,
    saved: true,
  }));
});
