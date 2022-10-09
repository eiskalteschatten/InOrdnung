import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';
import { ProjectFileMetaData } from '../../shared/interfaces/File';

export type State = ProjectFileMetaData;

const initialState: State = {
  saved: false,
  fileLoaded: false,
  path: '',
};

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
});

export const {
  setFileMetaData,
  updateFileMetaData,
  setSaved,
  setFileLoaded,
  setPath,
} = slice.actions;

export const { reducer } = slice;
