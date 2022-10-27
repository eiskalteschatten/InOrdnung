import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface State {
  isLoading?: boolean;
  openWelcomeDialog: boolean;
  globalInfo?: string;
  globalError?: string;
}

const initialState: State = {
  isLoading: false,
  openWelcomeDialog: false,
};

export const slice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setOpenWelcomeDialog: (state, action: PayloadAction<boolean>) => {
      state.openWelcomeDialog = action.payload;
    },
    setGlobalInfo: (state, action: PayloadAction<string>) => {
      state.globalInfo = action.payload;
    },
    setGlobalError: (state, action: PayloadAction<string>) => {
      state.globalError = action.payload;
    },
  },
});

export const {
  setIsLoading,
  setOpenWelcomeDialog,
  setGlobalInfo,
  setGlobalError,
} = slice.actions;

export const { reducer } = slice;
