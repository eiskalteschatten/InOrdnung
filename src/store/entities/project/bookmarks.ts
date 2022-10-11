import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Bookmark } from '../../../shared/interfaces/bookmarks';

export interface State {
  data?: Bookmark[];
  editing?: Bookmark;
}

const initialState: State = {
  data: [],
};

export const slice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    setBookmarks: (state, action: PayloadAction<Bookmark[] | undefined>) => {
      state.data = action.payload;
    },
    setEditingBookmark: (state, action: PayloadAction<Bookmark | undefined>) => {
      state.editing = action.payload;
    },
  },
});

export const {
  setBookmarks,
  setEditingBookmark,
} = slice.actions;

export const { reducer } = slice;
