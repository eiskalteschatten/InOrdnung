import { IpcRendererEvent } from 'electron';

import { dispatch } from '../store';
import { setIsLoading, setOpenWelcomeDialog } from '../store/entities/ui/session';

window.api.on('setIsLoading', (e: IpcRendererEvent, isLoading: boolean) => {
  dispatch(setIsLoading(isLoading));
});

window.api.on('setOpenWelcomeDialog', (e: IpcRendererEvent, openWelcomeDialog: boolean) => {
  dispatch(setOpenWelcomeDialog(openWelcomeDialog));
});
