import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface State {
  platform: string;
  prefersDarkMode?: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
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
  },
});

export const {
  setPlatform,
  setPrefersDarkMode,
  setCanGoBack,
  setCanGoForward,
} = slice.actions;

export const { reducer } = slice;
