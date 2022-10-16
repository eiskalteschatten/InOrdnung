import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortingState } from '@tanstack/react-table';

import { RootState } from '../..';
import { UiPreferences } from '../../../shared/interfaces/ui';

export type State = UiPreferences;

const initialState: State = {
  sidebarWidth: 260,
  middleColumnWidth: 350,
  rightSidebarWidth: 310,
  collapsedSidebarIds: [],
  bookmarks: {
    sortingState: [],
  },
};

export const addCollapsedSidebarId = createAsyncThunk(
  'ui/addCollapsedSidebarId',
  async (id: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { collapsedSidebarIds } = state.ui.preferences;

    if (!collapsedSidebarIds.includes(id)) {
      collapsedSidebarIds.push(id);
      thunkAPI.dispatch(setCollapsedSidebarIds(collapsedSidebarIds));
    }
  }
);

export const removeCollapsedSidebarId = createAsyncThunk(
  'ui/removeCollapsedSidebarId',
  async (id: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { collapsedSidebarIds } = state.ui.preferences;
    const index = collapsedSidebarIds.indexOf(id);

    if (index > -1) {
      collapsedSidebarIds.splice(index, 1);
      thunkAPI.dispatch(setCollapsedSidebarIds(collapsedSidebarIds));
    }
  }
);

export const slice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setPreferences: (state, action: PayloadAction<State>) => {
      state = action.payload;
      return state;
    },
    setSidebarWidth: (state, action: PayloadAction<number>) => {
      state.sidebarWidth = action.payload;
    },
    setMiddleColumnWidth: (state, action: PayloadAction<number>) => {
      state.middleColumnWidth = action.payload;
    },
    setRightSidebarWidth: (state, action: PayloadAction<number>) => {
      state.rightSidebarWidth = action.payload;
    },
    setCollapsedSidebarIds: (state, action: PayloadAction<string[]>) => {
      state.collapsedSidebarIds = action.payload;
    },
    setBookmarksSortingState: (state, action: PayloadAction<SortingState>) => {
      state.bookmarks.sortingState = action.payload;
    },
  },
});

export const {
  setSidebarWidth,
  setMiddleColumnWidth,
  setRightSidebarWidth,
  setCollapsedSidebarIds,
  setBookmarksSortingState,
  setPreferences,
} = slice.actions;

export const { reducer } = slice;
