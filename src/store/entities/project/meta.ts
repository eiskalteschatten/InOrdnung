import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { dispatch, RootState } from '../..';
import { Project } from '../../../shared/interfaces/Project';
import { setIsLoading } from '../ui';

export interface State {
  isSaved: boolean;
}

const initialState: State = {
  isSaved: false,
};

const serializeProject = (state: RootState): Project => ({
  ...state.project.info,
});

export const saveProject = createAsyncThunk(
  'project/saveProject',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const project = serializeProject(state);
    window.api.sendSync('saveProject', project);
  }
);

export const slice = createSlice({
  name: 'meta',
  initialState,
  reducers: {
    setIsSaved: (state, action: PayloadAction<boolean>) => {
      state.isSaved = action.payload;
    },
  },
  extraReducers(builder) {
    // Save Project
    builder
      .addCase(saveProject.pending, () => {
        dispatch(setIsLoading(true));
      })
      .addCase(saveProject.fulfilled, () => {
        dispatch(setIsLoading(false));
        // TODO:
        // 2. Clear global error message
      })
      .addCase(saveProject.rejected, (state, action) => {
        dispatch(setIsLoading(false));
        // TODO:
        // 2. Set global error message
        console.error(action.error);
      });
  },
});

export const {
  setIsSaved,
} = slice.actions;

export const { reducer } = slice;
