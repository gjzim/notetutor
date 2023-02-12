import { NOTES, STRING_FRET_NOTES } from "./constants/guitar";
import { OptionsType } from "./constants/options";

export const randomInteger = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const formatClockTime = (time: number) => {
    let secs = `${time % 60}`.padStart(2, "0");
    let minutes = `${Math.floor(time / 60)}`.padStart(2, "0");

    return `${minutes}:${secs}`;
};

const getRandomElement = <T>(arr: T[]) => {
    return arr[randomInteger(0, arr.length - 1)];
};

const getRandomNotes = (include: string[] = [], total: number = 5) => {
    let notes: string[] = [];

    while (notes.length < total) {
        const note = getRandomElement(NOTES);
        if (!notes.includes(note)) {
            notes.push(note);
        }
    }

    for (let note of include) {
        if (!notes.includes(note)) {
            notes[randomInteger(0, total - 1)] = note;
        }
    }

    return notes;
};

const generateQues = (options: OptionsType, prevQues: Question): Question => {
    if (options.strings.length === 1 && options.frets.length === 1) {
        return {
            string: options.strings[0],
            fret: options.frets[0],
        };
    }

    let string = getRandomElement(options.strings);
    let fret = getRandomElement(options.frets);

    while (string === prevQues.string && fret === prevQues.fret) {
        string = getRandomElement(options.strings);
        fret = getRandomElement(options.frets);
    }

    return { string, fret };
};

export const generateQuiz = (
    options: OptionsType,
    prevQuiz: Quiz = {
        serial: 0,
        ques: {
            string: -1,
            fret: -1,
        },
    }
): Quiz => {
    const ques = generateQues(options, prevQuiz.ques);
    const answer = STRING_FRET_NOTES[ques.string][ques.fret];

    return {
        serial: prevQuiz.serial + 1,
        ques: ques,
        answer: answer,
        options: getRandomNotes([answer], 5),
    };
};

export type Question = { string: number; fret: number };

export type Quiz = {
    serial: number;
    ques: Question;
    answer?: string;
    options?: string[];
};
