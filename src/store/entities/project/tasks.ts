import { createEntityAdapter, createSlice, EntityState, PayloadAction, Update } from '@reduxjs/toolkit';

import { RootState } from '../..';
import { Task } from '../../../shared/interfaces/tasks';

export const tasksAdapter = createEntityAdapter<Task>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const taskSelectors = tasksAdapter.getSelectors<RootState>(state => state.project.tasks.data);

export interface State {
  data: EntityState<Task>;
  editingId?: string;
}

const initialState: State = {
  data: tasksAdapter.getInitialState(),
};

export const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      tasksAdapter.setAll(state.data, action.payload);
    },
    addTask: (state, action: PayloadAction<Task>) => {
      tasksAdapter.addOne(state.data, action.payload);
    },
    updateTask: (state, action: PayloadAction<Update<Task>>) => {
      tasksAdapter.updateOne(state.data, action.payload);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      tasksAdapter.removeOne(state.data, action.payload);
    },
    setEditingId: (state, action: PayloadAction<string | undefined>) => {
      state.editingId = action.payload;
    },
  },
});

export const {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
  setEditingId,
} = slice.actions;

export const { reducer } = slice;
