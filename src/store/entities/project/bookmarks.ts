import { createEntityAdapter, createSlice, EntityState, PayloadAction, Update } from '@reduxjs/toolkit';

import { RootState } from '../..';
import { Bookmark } from '../../../shared/interfaces/bookmarks';

export const bookmarksAdapter = createEntityAdapter<Bookmark>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const bookmarkSelectors = bookmarksAdapter.getSelectors<RootState>(state => state.project.bookmarks.data);

export interface State {
  data: EntityState<Bookmark>;
}

const initialState: State = {
  data: bookmarksAdapter.getInitialState(),
};

export const slice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    setBookmarks: (state, action: PayloadAction<Bookmark[]>) => {
      bookmarksAdapter.setAll(state.data, action.payload);
    },
    addBookmark: (state, action: PayloadAction<Bookmark>) => {
      bookmarksAdapter.addOne(state.data, action.payload);
    },
    updateBookmark: (state, action: PayloadAction<Update<Bookmark>>) => {
      bookmarksAdapter.updateOne(state.data, action.payload);
    },
    deleteBookmark: (state, action: PayloadAction<string>) => {
      bookmarksAdapter.removeOne(state.data, action.payload);
    },
  },
});

export const {
  setBookmarks,
  addBookmark,
  updateBookmark,
  deleteBookmark,
} = slice.actions;

export const { reducer } = slice;
