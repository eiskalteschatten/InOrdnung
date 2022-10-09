import { IpcRendererEvent } from 'electron';

import { ProjectFileMetaData, ProjectFile } from '../shared/interfaces/File';
import { getState, dispatch } from '../store';
import { saveProject, setFileMetaData } from '../store/entities/file';
// import { projectSetProject } from '../store/actions/projectActions';
// import { uiSetPreferences } from '../store/actions/uiActions';

window.api.on('setProjectFileMetaData', (e: IpcRendererEvent, fileMetaData: ProjectFileMetaData): void => {
  const state = getState();
  dispatch(setFileMetaData({
    ...state.file,
    ...fileMetaData,
  }));
});

window.api.on('saveProject', (e: IpcRendererEvent, closeWindow = false): void => {
  dispatch(saveProject(closeWindow));
});

// window.api.on('openProject', (e: IpcRendererEvent, projectFile: ProjectFile, path: string): void => {
//   dispatch(projectSetProject(projectFile.project));
//   dispatch(uiSetPreferences(projectFile.ui));
//   dispatch(setFileMetaData({
//     path,
//     fileLoaded: true,
//     saved: true,
//   }));
//   window.api.send('projectIsEdited', false);
// });
