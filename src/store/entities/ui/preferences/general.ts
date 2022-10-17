import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../..';
import { GeneralUiPreferences } from '../../../../shared/interfaces/ui';

export type State = GeneralUiPreferences;

const initialState: State = {
  sidebarWidth: 260,
  middleColumnWidth: 350,
  rightSidebarWidth: 310,
  collapsedSidebarIds: [],
};

export const addCollapsedSidebarId = createAsyncThunk(
  'ui/addCollapsedSidebarId',
  async (id: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { collapsedSidebarIds } = state.ui.preferences.general;

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
    const { collapsedSidebarIds } = state.ui.preferences.general;
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
    setGeneralUiPreferences: (state, action: PayloadAction<State>) => {
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
  },
});

export const {
  setGeneralUiPreferences,
  setSidebarWidth,
  setMiddleColumnWidth,
  setRightSidebarWidth,
  setCollapsedSidebarIds,
} = slice.actions;

export const { reducer } = slice;
