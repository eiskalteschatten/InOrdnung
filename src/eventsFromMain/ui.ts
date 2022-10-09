import { IpcRendererEvent } from 'electron';

import { dispatch } from '../store';
import { setIsLoading } from '../store/entities/ui';

window.api.on('setIsLoading', (e: IpcRendererEvent, isLoading: boolean): any =>
  dispatch(setIsLoading(isLoading)));
