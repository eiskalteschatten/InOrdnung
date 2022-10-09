import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { dispatch, RootState } from '..';
import { ProjectFileMetaData } from '../../shared/interfaces/File';
import { setIsLoading } from './ui';

export type State = ProjectFileMetaData;

const initialState: State = {
  saved: false,
  fileLoaded: false,
  path: '',
};

export const saveProject = createAsyncThunk(
  'file/saveProject',
  async (closeWindow: boolean, thunkAPI) => {
    const { project, ui, file } = thunkAPI.getState() as RootState;
    window.api.sendSync('saveProject', { project, ui }, file, closeWindow);
  }
);

export const slice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setFileMetaData: (state, action: PayloadAction<State>) => {
      state = action.payload;
    },
    updateFileMetaData: (state, action: PayloadAction<State>) => {
      state = {
        ...state,
        ...action.payload,
      };
    },
    setSaved: (state, action: PayloadAction<boolean>) => {
      state.saved = action.payload;
    },
    setFileLoaded: (state, action: PayloadAction<boolean>) => {
      state.fileLoaded = action.payload;
    },
    setPath: (state, action: PayloadAction<string>) => {
      state.path = action.payload;
    },
  },
  extraReducers(builder) {
    // Save Project
    builder
      .addCase(saveProject.pending, () => {
        // dispatch(setIsLoading(true));
      })
      .addCase(saveProject.fulfilled, state => {
        // dispatch(setIsLoading(false));
        state.saved = true;
        // TODO:
        // 2. Clear global error message
      })
      .addCase(saveProject.rejected, (state, action) => {
        // dispatch(setIsLoading(false));
        state.saved = false;
        // TODO:
        // 2. Set global error message
        console.error(action.error);
      });
  },
});

export const {
  setFileMetaData,
  updateFileMetaData,
  setSaved,
  setFileLoaded,
  setPath,
} = slice.actions;

export const { reducer } = slice;
