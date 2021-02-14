import { remove } from 'lodash';

import { ProjectSetQuickNotes, ProjectAddQuickNote } from '.';
import { ReduxThunk } from '../../interfaces';
import { QuickNote } from '../../../interfaces/quickNotes';

import {
  PROJECT_SET_QUICK_NOTES,
  PROJECT_ADD_QUICK_NOTE,
} from '../../constants';

export const projectSetQuickNotes = (payload: QuickNote[]): ProjectSetQuickNotes => ({ type: PROJECT_SET_QUICK_NOTES, payload });
export const projectAddQuickNote = (payload: QuickNote): ProjectAddQuickNote => ({ type: PROJECT_ADD_QUICK_NOTE, payload });

export const projectEditQuickNote = (quickNote: QuickNote): ReduxThunk<void, typeof PROJECT_SET_QUICK_NOTES> =>
  (dispatch: any, getState: Function): ProjectSetQuickNotes => {
    const state = getState();
    const { quickNotes } = state.project;

    for (const index in quickNotes) {
      if (quickNotes[index].id === quickNote.id) {
        quickNotes[index] = quickNote;
        break;
      }
    }
    return dispatch({ type: PROJECT_SET_QUICK_NOTES, payload: quickNotes });
  };

export const projectDeleteQuickNote = (id: string): ReduxThunk<void, typeof PROJECT_SET_QUICK_NOTES> =>
  (dispatch: any, getState: Function): ProjectSetQuickNotes => {
    const state = getState();
    const { quickNotes } = state.project;
    remove(quickNotes, (quickNote: QuickNote): boolean => quickNote.id === id);
    return dispatch({ type: PROJECT_SET_QUICK_NOTES, payload: quickNotes });
  };
