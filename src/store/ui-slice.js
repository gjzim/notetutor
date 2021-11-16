import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    currentScreen: 'start',
  },
  reducers: {
    changeScreen(state, action) {
      state.currentScreen = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;