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
  tasks: {
    sortingState: [],
  },
};

export const addCollapsedSidebarId = createAsyncThunk(
  'ui/addCollapsedSidebarId',
  async (id: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { collapsedSidebarIds } = state.ui.preferences;

    if (!collapsedSidebarIds.includes(id)) {
      const _collapsedSidebarIds = [...collapsedSidebarIds];
      _collapsedSidebarIds.push(id);
      thunkAPI.dispatch(setCollapsedSidebarIds(_collapsedSidebarIds));
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
      const _collapsedSidebarIds = [...collapsedSidebarIds];
      _collapsedSidebarIds.splice(index, 1);
      thunkAPI.dispatch(setCollapsedSidebarIds(_collapsedSidebarIds));
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
      if (!state.bookmarks) {
        state.bookmarks = initialState.bookmarks;
      }

      state.bookmarks!.sortingState = action.payload;
    },
    setTasksSortingState: (state, action: PayloadAction<SortingState>) => {
      if (!state.tasks) {
        state.tasks = initialState.tasks;
      }

      state.tasks!.sortingState = action.payload;
    },
  },
});

export const {
  setPreferences,
  setSidebarWidth,
  setMiddleColumnWidth,
  setRightSidebarWidth,
  setCollapsedSidebarIds,
  setBookmarksSortingState,
  setTasksSortingState,
} = slice.actions;

export const { reducer } = slice;
