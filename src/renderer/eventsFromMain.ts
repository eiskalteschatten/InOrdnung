import { IpcRendererEvent } from 'electron';

import { ProjectInfo } from '../interfaces/project';
import { getState, dispatch } from '../store';
import { appSetPlatform } from '../store/actions/appActions';
import { projectInfoSetInfo } from '../store/actions/projectInfoActions';

const { ipcRenderer } = window.require('electron');

ipcRenderer.on('appSetPlatform', (event: IpcRendererEvent, platform: string): any =>
  dispatch(appSetPlatform(platform)));

ipcRenderer.on('updateProjectInfo', (event: IpcRendererEvent, projectInfo: ProjectInfo): void => {
  console.log('ipcrendereron');
  const state = getState();
  dispatch(projectInfoSetInfo({
    ...state.projectInfo,
    ...projectInfo,
  }));
});
