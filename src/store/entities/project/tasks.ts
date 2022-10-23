import { createEntityAdapter, createSlice, EntityState, PayloadAction, Update } from '@reduxjs/toolkit';

import { RootState } from '../..';
import { Task, TaskList } from '../../../shared/interfaces/tasks';

export const tasksAdapter = createEntityAdapter<Task>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const taskSelectors = tasksAdapter.getSelectors<RootState>(state => state.project.tasks.data);

export const taskListsAdapter = createEntityAdapter<TaskList>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const taskListSelectors = taskListsAdapter.getSelectors<RootState>(state => state.project.tasks.lists);

export interface State {
  data: EntityState<Task>;
  lists: EntityState<TaskList>;
  editingId?: string;
  listEditingId?: string;
  currentTaskNumber: number;
}

const initialState: State = {
  data: tasksAdapter.getInitialState(),
  lists: taskListsAdapter.getInitialState(),
  currentTaskNumber: 1,
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
    setTaskLists: (state, action: PayloadAction<TaskList[]>) => {
      taskListsAdapter.setAll(state.lists, action.payload);
    },
    addTaskList: (state, action: PayloadAction<TaskList>) => {
      taskListsAdapter.addOne(state.lists, action.payload);
    },
    updateTaskList: (state, action: PayloadAction<Update<TaskList>>) => {
      taskListsAdapter.updateOne(state.lists, action.payload);
    },
    deleteTaskList: (state, action: PayloadAction<string>) => {
      taskListsAdapter.removeOne(state.lists, action.payload);
    },
    setListEditingId: (state, action: PayloadAction<string | undefined>) => {
      state.listEditingId = action.payload;
    },
    setCurrentTaskNumber: (state, action: PayloadAction<number>) => {
      state.currentTaskNumber = action.payload;
    },
  },
});

export const {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
  setEditingId,
  setTaskLists,
  addTaskList,
  updateTaskList,
  deleteTaskList,
  setListEditingId,
  setCurrentTaskNumber,
} = slice.actions;

export const { reducer } = slice;
