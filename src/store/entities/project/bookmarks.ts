import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Bookmark } from '../../../shared/interfaces/bookmarks';

export interface State {
  all?: Bookmark[];
}

const initialState: State = {
  all: [],
};

export const slice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    setAllBookmarks: (state, action: PayloadAction<Bookmark[] | undefined>) => {
      state.all = action.payload;
    },
  },
});

export const {
  setAllBookmarks,
} = slice.actions;

export const { reducer } = slice;
