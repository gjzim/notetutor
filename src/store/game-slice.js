import { createSlice } from "@reduxjs/toolkit";

const gameInitState = {
  running: false,
  playing: false,
  options: {
    totalQues: 20,
    strings: [1, 2, 3, 4, 5, 6],
    frets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  },
  instance: null
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
