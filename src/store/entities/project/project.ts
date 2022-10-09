import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { dispatch, RootState } from '../..';
import { Project } from '../../../shared/interfaces/Project';
import { setIsLoading } from '../ui';

export type State = object;

const initialState: State = {

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
  name: 'project',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    // Save Project
    builder.addCase(saveProject.pending, () => {
      dispatch(setIsLoading(true));
    });

    builder.addCase(saveProject.fulfilled, () => {
      dispatch(setIsLoading(false));
      // TODO:
      // 2. Clear global error message
    });

    builder.addCase(saveProject.rejected, (state, action) => {
      dispatch(setIsLoading(false));
      // TODO:
      // 2. Set global error message
      console.error(action.error);
    });
  },
});

export const { reducer } = slice;
