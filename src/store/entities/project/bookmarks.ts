import { createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../..';
import { Bookmark } from '../../../shared/interfaces/bookmarks';

export const bookmarksAdapter = createEntityAdapter<Bookmark>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const bookmarkSelectors = bookmarksAdapter.getSelectors<RootState>(state => state.project.bookmarks.data);

export interface State {
  data: EntityState<Bookmark>;
  editing?: Bookmark;
}

const initialState: State = {
  data: bookmarksAdapter.getInitialState(),
};

export const slice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    setBookmarks: (state, action) => {
      bookmarksAdapter.setAll(state.data, action.payload);
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
