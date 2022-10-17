import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortingState } from '@tanstack/react-table';

import { TasksUiPreferences } from '../../../../shared/interfaces/ui';

export type State = TasksUiPreferences;

const initialState: State = {
  sortingState: [],
  showCompletedTasks: false,
};

export const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTaskUiPreferences: (state, action: PayloadAction<State>) => {
      state = action.payload;
      return state;
    },
    setSortingState: (state, action: PayloadAction<SortingState>) => {
      state.sortingState = action.payload;
    },
    setShowCompletedTasks: (state, action: PayloadAction<boolean>) => {
      state.showCompletedTasks = action.payload;
    },
  },
});

export const {
  setTaskUiPreferences,
  setSortingState,
  setShowCompletedTasks,
} = slice.actions;

export const { reducer } = slice;
