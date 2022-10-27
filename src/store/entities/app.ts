import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RecentProjectsLocalStorage } from '../../shared/interfaces/settings';

export interface State {
  platform: string;
  prefersDarkMode?: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
  recentProjects?: RecentProjectsLocalStorage[];
}

const initialState: State = {
  platform: '',
  prefersDarkMode: false,
  canGoBack: false,
  canGoForward: false,
};

export const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setPlatform: (state, action: PayloadAction<string>) => {
      state.platform =  action.payload;
    },
    setPrefersDarkMode: (state, action: PayloadAction<boolean>) => {
      state.prefersDarkMode =  action.payload;
    },
    setCanGoBack: (state, action: PayloadAction<boolean>) => {
      state.canGoBack =  action.payload;
    },
    setCanGoForward: (state, action: PayloadAction<boolean>) => {
      state.canGoForward =  action.payload;
    },
    setRecentProjects: (state, action: PayloadAction<RecentProjectsLocalStorage[]>) => {
      state.recentProjects =  action.payload;
    },
  },
});

export const {
  setPlatform,
  setPrefersDarkMode,
  setCanGoBack,
  setCanGoForward,
  setRecentProjects,
} = slice.actions;

export const { reducer } = slice;
