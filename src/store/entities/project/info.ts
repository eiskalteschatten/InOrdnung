import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProjectInfo } from '../../../shared/interfaces/project';

export type State = ProjectInfo;

const initialState: State = {
  name: '',
  description: '',
};

export const slice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    setProjectInfo: (state, action: PayloadAction<State>) => {
      state = action.payload;
      return state;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
  },
});

export const {
  setProjectInfo,
  setName,
  setDescription,
} = slice.actions;

export const { reducer } = slice;
