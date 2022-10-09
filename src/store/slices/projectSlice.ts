import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';
import { Project, ProjectInfo } from '../../shared/interfaces/Project';

export type State = ProjectInfo;

const initialState: State = {
  name: '',
  description: '',
};

const serializeProject = (state: RootState): Project => ({
  ...state.project,
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
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
  },
  extraReducers(builder) {
    // Save Project
    builder.addCase(saveProject.pending, (state, action) => {
      // TODO:
      // 1. Start loader
    });

    builder.addCase(saveProject.fulfilled, (state, action) => {
      // TODO:
      // 1. Stop loader
      // 2. Clear global error message
    });

    builder.addCase(saveProject.rejected, (state, action) => {
      // TODO:
      // 1. Stop loader
      // 2. Set global error message
      console.error(action.error);
    });
  },
});

export const {
  setName,
  setDescription,
} = slice.actions;

export default slice.reducer;