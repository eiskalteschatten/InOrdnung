import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';
import { UiPreferences } from '../../shared/interfaces/UI';

export interface State {
  preferences: UiPreferences;
  isLoading?: boolean;
}

const initialState: State = {
  preferences: {
    sidebarWidth: 260,
    middleColumnWidth: 350,
    collapsedAccountIds: [],
    bookmarksSortingOptions: {
      sortBy: '',
      sortDirection: 'desc',
    },
  },
  isLoading: false,
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
  name: 'ui',
  initialState,
  reducers: {
    setSidebarWidth: (state, action: PayloadAction<number>) => {
      state.preferences.sidebarWidth = action.payload;
    },
    setMiddleColumnWidth: (state, action: PayloadAction<number>) => {
      state.preferences.middleColumnWidth = action.payload;
    },
    setCollapsedAccountIds: (state, action: PayloadAction<number[]>) => {
      state.preferences.collapsedAccountIds = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setPreferences: (state, action: PayloadAction<UiPreferences>) => {
      state.preferences = action.payload;
    },
  },
});

export const {
  setSidebarWidth,
  setMiddleColumnWidth,
  setCollapsedAccountIds,
  setIsLoading,
  setPreferences,
} = slice.actions;

export const { reducer } = slice;
