import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface State {
  isLoading?: boolean;
  globalInfo?: string;
  globalError?: string;
  bookmarks: {
    sidebarOpen: boolean;
  },
}

const initialState: State = {
  isLoading: false,
  bookmarks: {
    sidebarOpen: false,
  },
};

export const slice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setGlobalInfo: (state, action: PayloadAction<string>) => {
      state.globalInfo = action.payload;
    },
    setGlobalError: (state, action: PayloadAction<string>) => {
      state.globalError = action.payload;
    },
    setBookmarksSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.bookmarks.sidebarOpen = action.payload;
    },
  },
});

export const {
  setIsLoading,
  setGlobalInfo,
  setGlobalError,
  setBookmarksSidebarOpen,
} = slice.actions;

export const { reducer } = slice;
