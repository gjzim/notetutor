import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_OPTIONS, DefaultOptions } from "../constants/options";

const optionsSlice = createSlice({
    name: "options",
    initialState: DEFAULT_OPTIONS,
    reducers: {
        updateOptions(state, action: { payload: DefaultOptions }) {
            state.totalQues = action.payload.totalQues || state.totalQues;
            state.strings = action.payload.strings || state.strings;
            state.frets = action.payload.frets || state.frets;
        },
        resetOptions(state) {
            state.totalQues = DEFAULT_OPTIONS.totalQues;
            state.strings = DEFAULT_OPTIONS.strings;
            state.frets = DEFAULT_OPTIONS.frets;
        },
    },
});

export const optionsActions = optionsSlice.actions;

export type OptionsState = DefaultOptions;

export default optionsSlice;
