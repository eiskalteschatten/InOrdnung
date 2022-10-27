import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortingState } from '@tanstack/react-table';

import { BookmarksUiPreferences } from '../../../../shared/interfaces/ui';

export type State = BookmarksUiPreferences;

const initialState: State = {
  sortingState: [],
};

export const slice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    setBookmarkUiPreferences: (state, action: PayloadAction<State>) => {
      state = action.payload;
      return state;
    },
    setSortingState: (state, action: PayloadAction<SortingState>) => {
      state.sortingState = action.payload;
    },
  },
});

export const {
  setBookmarkUiPreferences,
  setSortingState,
} = slice.actions;

export const { reducer } = slice;
