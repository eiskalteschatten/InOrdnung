import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';

export interface State {
  sidebarWidth: number;
  middleColumnWidth: number;
  collapsedAccountIds: number[];
  isLoading: boolean;
}

const initialState: State = {
  sidebarWidth: Number(localStorage.getItem('sidebarWidth')) || 260,
  middleColumnWidth: Number(localStorage.getItem('middleColumnWidth')) || 350,
  collapsedAccountIds: JSON.parse(localStorage.getItem('collapsedAccountIds') || '[]'),
  isLoading: false,
};

export const addCollapsedAccountId = createAsyncThunk(
  'ui/addCollapsedAccountId',
  async (id: number, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { collapsedAccountIds } = state.ui;

    if (!collapsedAccountIds.includes(id)) {
      collapsedAccountIds.push(id);
      thunkAPI.dispatch(setCollapsedAccountIds(collapsedAccountIds));
    }
  }
);

export const removeCollapsedAccountId = createAsyncThunk(
  'ui/addCollapsedAccountId',
  async (id: number, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { collapsedAccountIds } = state.ui;
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
      state.sidebarWidth = action.payload;
      localStorage.setItem('sidebarWidth', action.payload.toString());
    },
    setMiddleColumnWidth: (state, action: PayloadAction<number>) => {
      state.middleColumnWidth = action.payload;
      localStorage.setItem('middleColumnWidth', action.payload.toString());
    },
    setCollapsedAccountIds: (state, action: PayloadAction<number[]>) => {
      state.collapsedAccountIds = action.payload;
      localStorage.setItem('collapsedAccountIds', JSON.stringify(action.payload));
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setSidebarWidth,
  setMiddleColumnWidth,
  setCollapsedAccountIds,
  setIsLoading,
} = slice.actions;

export default slice.reducer;
