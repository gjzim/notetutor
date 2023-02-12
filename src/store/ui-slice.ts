import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ScreenType = "start" | "game" | "end";

const initState: { currentScreen: ScreenType } = {
    currentScreen: "start",
};

const uiSlice = createSlice({
    name: "ui",
    initialState: initState,
    reducers: {
        changeScreen(state, action: PayloadAction<ScreenType>) {
            state.currentScreen = action.payload;
        },
    },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
