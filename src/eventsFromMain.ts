import { IpcRendererEvent } from 'electron';

import { ProjectInfo, ProjectFileMetaData } from './interfaces/project';
import { getState, dispatch } from './store';
import { appSetPlatform } from './store/actions/appActions';
import { projectSetProjectInfo, projectDeleteImage } from './store/actions/projectActions';
import { fileSetMetaData } from './store/actions/fileActions';

const { ipcRenderer } = window.require('electron');

ipcRenderer.on('appSetPlatform', (e: IpcRendererEvent, platform: string): any =>
  dispatch(appSetPlatform(platform)));

ipcRenderer.on('updateProjectInfo', (e: IpcRendererEvent, projectInfo: ProjectInfo): void => {
  const state = getState();
  dispatch(projectSetProjectInfo({
    ...state.project.projectInfo,
    ...projectInfo,
  }));
});

ipcRenderer.on('deleteProjectImage', (): any => dispatch(projectDeleteImage()));

ipcRenderer.on('setProjectFileMetaData', (e: IpcRendererEvent, fileMetaData: ProjectFileMetaData): void => {
  const state = getState();
  dispatch(fileSetMetaData({
    ...state.file,
    ...fileMetaData,
  }));
});

ipcRenderer.on('saveProject', (): void => {
  const { project, file } = getState();
  ipcRenderer.send('saveProject', project, file);
});
