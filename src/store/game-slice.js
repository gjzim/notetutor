import { createSlice } from "@reduxjs/toolkit";

const gameInitState = {
  running: false,
  playing: false,
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
    timeAddSecond(state) {
      if (state.playing) {
        state.time++;
      }
    },
  },
});

export const gameActions = gameSlice.actions;

export default gameSlice;
