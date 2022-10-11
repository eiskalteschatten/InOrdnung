import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortingState } from '@tanstack/react-table';

import { RootState } from '../..';
import { UiPreferences } from '../../../shared/interfaces/ui';

export type State = UiPreferences;

const initialState: State = {
  sidebarWidth: 260,
  middleColumnWidth: 350,
  collapsedAccountIds: [],
  bookmarksSortingState: [],
};

export const addCollapsedAccountId = createAsyncThunk(
  'ui/addCollapsedAccountId',
  async (id: number, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { collapsedAccountIds } = state.ui.preferences;

    if (!collapsedAccountIds.includes(id)) {
      collapsedAccountIds.push(id);
      thunkAPI.dispatch(setCollapsedAccountIds(collapsedAccountIds));
    }
  }
);

export const removeCollapsedAccountId = createAsyncThunk(
  'ui/removeCollapsedAccountId',
  async (id: number, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { collapsedAccountIds } = state.ui.preferences;
    const index = collapsedAccountIds.indexOf(id);

    if (index > -1) {
      collapsedAccountIds.splice(index, 1);
      thunkAPI.dispatch(setCollapsedAccountIds(collapsedAccountIds));
    }
  }
);

export const slice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setSidebarWidth: (state, action: PayloadAction<number>) => {
      state.sidebarWidth = action.payload;
    },
    setMiddleColumnWidth: (state, action: PayloadAction<number>) => {
      state.middleColumnWidth = action.payload;
    },
    setCollapsedAccountIds: (state, action: PayloadAction<number[]>) => {
      state.collapsedAccountIds = action.payload;
    },
    setBookmarksSortingState: (state, action: PayloadAction<SortingState>) => {
      state.bookmarksSortingState = action.payload;
    },
    setPreferences: (state, action: PayloadAction<State>) => {
      state = action.payload;
      return state;
    },
  },
});

export const {
  setSidebarWidth,
  setMiddleColumnWidth,
  setCollapsedAccountIds,
  setBookmarksSortingState,
  setPreferences,
} = slice.actions;

export const { reducer } = slice;
