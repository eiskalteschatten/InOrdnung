import { IpcRendererEvent } from 'electron';

import { QuickNote } from '../interfaces/quickNotes';

import { dispatch } from '../store';
import { projectDeleteQuickNote } from '../store/actions/projectActions/quickNoteActions';

const { ipcRenderer } = window.require('electron');

ipcRenderer.on('deleteQuickNote', (e: IpcRendererEvent, quickNote: QuickNote): void => {
  if (quickNote.id) {
    dispatch(projectDeleteQuickNote(quickNote.id));
  }
});
