import { IpcRendererEvent } from 'electron';

import { dispatch } from '../store';
import { setCanGoBack, setCanGoForward, setPlatform, setRecentProjects } from '../store/entities/app';
import { RecentProjectsLocalStorage } from '../shared/interfaces/settings';

window.api.on('setPlatform', (e: IpcRendererEvent, platform: string) => {
  dispatch(setPlatform(platform));
});

window.api.on('setCanGoBack', (e: IpcRendererEvent, canGoBack: boolean) => {
  dispatch(setCanGoBack(canGoBack));
});

window.api.on('setCanGoForward', (e: IpcRendererEvent, canGoForward: boolean) => {
  dispatch(setCanGoForward(canGoForward));
});

window.api.on('setRecentProjects', (e: IpcRendererEvent, recentProjects: RecentProjectsLocalStorage[]) => {
  dispatch(setRecentProjects(recentProjects));
});
