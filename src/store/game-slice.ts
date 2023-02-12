import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Quiz } from "../util";

export type GameQuiz = {
    current: Quiz;
    prev: null | {
        serial: number;
        string: number;
        fret: number;
    };
};

export type GameState = {
    playing: boolean;
    quiz: GameQuiz | null;
    score: number;
    time: number;
};

const initState: GameState = {
    playing: false,
    quiz: null,
    score: 0,
    time: 0,
};

const gameSlice = createSlice({
    name: "game",
    initialState: initState,
    reducers: {
        start(state, action: PayloadAction<{ quiz: Quiz }>) {
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
        advance(state, action: PayloadAction<{ quiz: Quiz }>) {
            if (!state.quiz) return;

            state.quiz.prev = {
                serial: state.quiz.current.serial,
                string: state.quiz.current.ques.string,
                fret: state.quiz.current.ques.fret,
            };

            state.quiz.current = action.payload.quiz;
        },
        updateScore(state, action: PayloadAction<string>) {
            if (action.payload === "correct") {
                state.score++;
            }
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
