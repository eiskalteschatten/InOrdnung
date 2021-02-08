import { IpcRendererEvent } from 'electron';

import { ProjectFileMetaData, ProjectFile } from './interfaces/project';
import { ProjectInfo } from './interfaces/projectInfo';
import { getState, dispatch } from './store';
import { appSetPlatform } from './store/actions/appActions';
import { projectSetProject, projectSetProjectInfo, projectDeleteImage } from './store/actions/projectActions/projectInfoActions';
import { fileSetMetaData } from './store/actions/fileActions';
import { projectDeleteBookmark } from './store/actions/projectActions/bookmarkActions';
import { Bookmark } from './interfaces/bookmarks';
import { isValidUrl } from './lib/links';

const { ipcRenderer, shell } = window.require('electron');

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

ipcRenderer.on('openBookmark', (e: IpcRendererEvent, bookmark: Bookmark): void => {
  if (bookmark.url && isValidUrl(bookmark.url)) {
    shell.openExternal(bookmark.url);
  }
});

ipcRenderer.on('editBookmark', (e: IpcRendererEvent, bookmark: Bookmark): void => {
  console.log('edit', bookmark);
});

ipcRenderer.on('deleteBookmark', (e: IpcRendererEvent, bookmark: Bookmark): void => {
  if (bookmark.id) {
    dispatch(projectDeleteBookmark(bookmark.id));
  }
});
