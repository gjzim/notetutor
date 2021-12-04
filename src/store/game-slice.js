import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    playing: false,
    quiz: null,
    score: 0,
    time: 0,
  },
  reducers: {
    start(state, action) {
      state.playing = true;
      state.quiz = {
        current: action.payload.quiz,
        prev: null,
      };
      state.score = 0;
      state.time = 0;
    },
    quit(state) {
      state.playing = false;
      state.quiz = null;
    },
    pause(state) {
      state.playing = false;
    },
    resume(state) {
      state.playing = true;
    },
    advance(state, action) {
      if (action.payload.result === 'correct') {
        state.score++;
      }

      state.quiz.prev = {
        serial: state.quiz.current.serial,
        string: state.quiz.current.ques.string,
        fret: state.quiz.current.ques.fret,
      };

      state.quiz.current = action.payload.quiz;
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
