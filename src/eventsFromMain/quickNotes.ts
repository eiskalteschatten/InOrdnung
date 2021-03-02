import { IpcRendererEvent } from 'electron';

import { QuickNote } from '../interfaces/quickNotes';

import { dispatch } from '../store';
import { projectDeleteQuickNote } from '../store/actions/projectActions/quickNoteActions';

window.api.on('deleteQuickNote', (e: IpcRendererEvent, quickNote: QuickNote): void => {
  if (quickNote.id) {
    dispatch(projectDeleteQuickNote(quickNote.id));
  }
});
