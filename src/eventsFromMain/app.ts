import { IpcRendererEvent } from 'electron';

import { dispatch } from '../store';
import { appSetPlatform } from '../store/actions/appActions';

const { ipcRenderer } = window.require('electron');

ipcRenderer.on('appSetPlatform', (e: IpcRendererEvent, platform: string): any =>
  dispatch(appSetPlatform(platform)));
