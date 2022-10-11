import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Bookmark } from '../../../shared/interfaces/bookmarks';

export interface State {
  data?: Bookmark[];
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
  },
});

export const {
  setBookmarks,
} = slice.actions;

export const { reducer } = slice;
