import { AnyAction, configureStore, ThunkAction, combineReducers, PreloadedState } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import gameSlice from "./game-slice";
import optionsSlice from "./options-slice";

const rootReducer = combineReducers({
    ui: uiSlice.reducer,
    game: gameSlice.reducer,
    options: optionsSlice.reducer,
});

export function setupStore(preloadedState?: PreloadedState<AppState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState: {},
    });
}

export type AppState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, AnyAction>;
