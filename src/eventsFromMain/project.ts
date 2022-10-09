import { IpcRendererEvent } from 'electron';

import { ProjectFileMetaData, ProjectFile } from '../shared/interfaces/File';
import { dispatch, getState } from '../store';
import { setFileMetaData } from '../store/entities/file';
import { setIsLoading } from '../store/entities/ui';
// import { projectSetProject } from '../store/actions/projectActions';
// import { uiSetPreferences } from '../store/actions/uiActions';

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
  window.api.send('saveProject', { project, ui }, file, closeWindow);
});

window.api.on('saveProjectAs', () => {
  dispatch(setIsLoading(true));
  const { project, ui, file } = getState();
  window.api.send('saveProjectAs', { project, ui }, file);
});

// window.api.on('openProject', (e: IpcRendererEvent, projectFile: ProjectFile, path: string) => {
//   dispatch(projectSetProject(projectFile.project));
//   dispatch(uiSetPreferences(projectFile.ui));
//   dispatch(setFileMetaData({
//     path,
//     fileLoaded: true,
//     saved: true,
//   }));
//   window.api.send('projectIsEdited', false);
// });
