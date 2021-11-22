import { configureStore } from '@reduxjs/toolkit';
import gameSlice from './game-slice';

import uiSlice from './ui-slice';

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    game: gameSlice.reducer
  },
});

export default store;