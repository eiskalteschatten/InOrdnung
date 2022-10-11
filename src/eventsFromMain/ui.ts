import { IpcRendererEvent } from 'electron';

import { dispatch } from '../store';
import { setIsLoading } from '../store/entities/ui/session';

window.api.on('setIsLoading', (e: IpcRendererEvent, isLoading: boolean) => {
  dispatch(setIsLoading(isLoading));
});
