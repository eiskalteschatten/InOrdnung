import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
      return state;
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
  setSaved,
  setFileLoaded,
  setPath,
} = slice.actions;

export const { reducer } = slice;
