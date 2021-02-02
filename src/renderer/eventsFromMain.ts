import { IpcRendererEvent } from 'electron';

import { ProjectInfo } from '../interfaces/project';
import { getState, dispatch } from '../store';
import { projectSetProjectInfo } from '../store/actions/projectActions';

const { ipcRenderer } = window.require('electron');

ipcRenderer.on('updateProjectInfo', (event: IpcRendererEvent, projectInfo: ProjectInfo): void => {
  console.log('ipcrendereron');
  const state = getState();
  dispatch(projectSetProjectInfo({
    ...state.project.data.projectInfo,
    ...projectInfo,
  }));
});
