import { createSlice } from "@reduxjs/toolkit";

export type ScreenType = "start" | "game" | "end";

const initState: { currentScreen: ScreenType } = {
    currentScreen: "start",
};

const uiSlice = createSlice({
    name: "ui",
    initialState: initState,
    reducers: {
        changeScreen(state, action: { payload: ScreenType }) {
            state.currentScreen = action.payload;
        },
    },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
