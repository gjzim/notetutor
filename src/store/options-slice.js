import { createSlice } from "@reduxjs/toolkit";
import { defaultOptions } from "./default-options";

const optionsSlice = createSlice({
  name: "options",
  initialState: defaultOptions,
  reducers: {
    updateOptions(state, action) {
      state.totalQues = action.payload.totalQues || state.totalQues;
      state.strings = action.payload.strings || state.strings;
      state.frets = action.payload.frets || state.frets;
    },
    resetOptions(state) {
      state.totalQues = defaultOptions.totalQues;
      state.strings = defaultOptions.strings;
      state.frets = defaultOptions.frets;
    },
  },
});

export const optionsActions = optionsSlice.actions;

export default optionsSlice;
