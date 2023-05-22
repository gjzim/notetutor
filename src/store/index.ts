import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import gameSlice from "./game-slice";
import optionsSlice from "./options-slice";

const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        game: gameSlice.reducer,
        options: optionsSlice.reducer,
    },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, AnyAction>;

export default store;