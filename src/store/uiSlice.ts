import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UIState } from '@/types';

const initialState: UIState = {
  isLoading: false,
  error: null,
  success: null,
  warning: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSuccess: (state, action: PayloadAction<string | null>) => {
      state.success = action.payload;
    },
    setWarning: (state, action: PayloadAction<string | null>) => {
      state.warning = action.payload;
    },
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
      state.warning = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
    clearWarning: (state) => {
      state.warning = null;
    },
  },
});

export const {
  setLoading,
  setError,
  setSuccess,
  setWarning,
  clearMessages,
  clearError,
  clearSuccess,
  clearWarning,
} = uiSlice.actions;

export default uiSlice.reducer;
