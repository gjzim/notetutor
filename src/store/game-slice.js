import { createSlice } from "@reduxjs/toolkit";
import { gameDefaultOptions }  from './game-default-options';

const gameInitState = {
  running: false,
  playing: false,
  options: gameDefaultOptions,
  instance: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState: gameInitState,
  reducers: {
    start(state) {
      state.running = true;
      state.playing = true;
    },
    quit(state) {
      state = gameInitState;
    },
    pause(state) {
      state.playing = false;
    },
    resume(state) {
      state.playing = true;
    },
    setOptions(state, action) {
      state.option = action.payload;
    },
    timeAddSecond(state) {
      if (state.playing) {
        state.time++;
      }
    },
  },
});

export const gameActions = gameSlice.actions;

export default gameSlice;
