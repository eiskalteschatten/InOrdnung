import { IpcRendererEvent } from 'electron';

import { ProjectInfo } from '../interfaces/projectInfo';
import { getState, dispatch } from '../store';
import { projectSetProjectInfo, projectDeleteImage } from '../store/actions/projectActions/projectInfoActions';

window.api.on('updateProjectInfo', (e: IpcRendererEvent, projectInfo: ProjectInfo): void => {
  const state = getState();
  dispatch(projectSetProjectInfo({
    ...state.project.projectInfo,
    ...projectInfo,
  }));
});

window.api.on('deleteProjectImage', (): any => dispatch(projectDeleteImage()));
