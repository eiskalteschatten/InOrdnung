import { IpcRendererEvent } from 'electron';

import { ProjectFileMetaData, ProjectFile } from '../shared/interfaces/file';
import { getProjectForSaving } from '../shared/lib/project';
import { dispatch, getState } from '../store';
import { setFileMetaData } from '../store/entities/file';
import { setBookmarks } from '../store/entities/project/bookmarks';
import { setProjectInfo } from '../store/entities/project/info';
import { setPreferences } from '../store/entities/ui/preferences';
import { setIsLoading } from '../store/entities/ui/session';

window.api.on('setProjectFileMetaData', (e: IpcRendererEvent, fileMetaData: ProjectFileMetaData) => {
  const { file } = getState();
  dispatch(setFileMetaData({
    ...file,
    ...fileMetaData,
  }));
});

window.api.on('saveProject', (e: IpcRendererEvent, closeWindow = false) => {
  dispatch(setIsLoading(true));
  const { file } = getState();
  window.api.send('saveProject', getProjectForSaving(), file, closeWindow);
});

window.api.on('saveProjectAs', () => {
  dispatch(setIsLoading(true));
  const { file } = getState();
  window.api.send('saveProjectAs', getProjectForSaving(), file);
});

window.api.on('openProject', (e: IpcRendererEvent, projectFile: ProjectFile, path: string) => {
  dispatch(setProjectInfo(projectFile.project.info));
  dispatch(setBookmarks(projectFile.project.bookmarks));

  dispatch(setPreferences(projectFile.ui));

  dispatch(setFileMetaData({
    path,
    fileLoaded: true,
    saved: true,
  }));

  window.api.send('projectIsEdited', false);
});
