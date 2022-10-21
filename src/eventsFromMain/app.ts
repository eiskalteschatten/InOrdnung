import { IpcRendererEvent } from 'electron';

import { dispatch } from '../store';
import { setCanGoBack, setCanGoForward, setPlatform } from '../store/entities/app';

window.api.on('setPlatform', (e: IpcRendererEvent, platform: string) => {
  dispatch(setPlatform(platform));
});

window.api.on('setCanGoBack', (e: IpcRendererEvent, canGoBack: boolean) => {
  dispatch(setCanGoBack(canGoBack));
});

window.api.on('setCanGoForward', (e: IpcRendererEvent, canGoForward: boolean) => {
  dispatch(setCanGoForward(canGoForward));
});
