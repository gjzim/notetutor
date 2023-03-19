import { formatSecondsToClockTime, generateQues, generateQuiz, getRandomNotes, Quiz, randomInteger } from "./util";
import { STRING_FRET_NOTES } from "../constants/guitar";
import { DEFAULT_OPTIONS } from "../constants/options";

describe("randomInteger", () => {
    it("returns number between min and max", () => {
        const randomNum = randomInteger(2, 10);

        expect(randomNum).toBeGreaterThanOrEqual(2);
        expect(randomNum).toBeLessThanOrEqual(10);
    });

    it("returns correctly when min and max are same", () => {
        expect(randomInteger(2, 2)).toBe(2);
    });
});

describe("formatSecondsToClockTime", () => {
    it("returns 00:00 for 0 seconds", () => {
        expect(formatSecondsToClockTime(0)).toBe("00:00");
    });

    it("returns 59:59 for 3,599 seconds", () => {
        expect(formatSecondsToClockTime(3599)).toBe("59:59");
    });
});

describe("getRandomNotes", () => {
    it("returns empty notes array for 0 total elements", () => {
        expect(getRandomNotes([], 0)).toEqual([]);
        expect(getRandomNotes([STRING_FRET_NOTES[1][0]], 0)).toEqual([]);
    });

    it("returns notes array with include notes passed in argument", () => {
        expect(getRandomNotes([STRING_FRET_NOTES[1][0]], 1)).toEqual([STRING_FRET_NOTES[1][0]]);
        expect(getRandomNotes([STRING_FRET_NOTES[1][0], STRING_FRET_NOTES[1][1]], 2)).toEqual([
            STRING_FRET_NOTES[1][0],
            STRING_FRET_NOTES[1][1],
        ]);
        expect(getRandomNotes([STRING_FRET_NOTES[1][0]], 5)).toHaveLength(5);
    });
});

describe("generateQues", () => {
    const prevQues = { string: 1, fret: 0 };
    it("returns the only question set in the option", () => {
        const option = {
            totalQues: 30,
            strings: [prevQues.string],
            frets: [prevQues.fret],
        };

        expect(generateQues(option, prevQues)).toEqual(prevQues);
    });

    it("does not return the previous question", () => {
        expect(generateQues(DEFAULT_OPTIONS, prevQues)).not.toEqual(prevQues);
    });
});

describe("generateQuiz", () => {
    const prevQuiz: Quiz = {
        serial: 0,
        ques: {
            string: -1,
            fret: -1,
        },
    };

    it("returns next question in quiz", () => {
        const nextQuiz = generateQuiz(DEFAULT_OPTIONS, prevQuiz);
        expect(nextQuiz.serial).toBe(prevQuiz.serial + 1);
    });

    it("returns correct answer for the question in quiz", () => {
        const nextQuiz = generateQuiz(DEFAULT_OPTIONS, prevQuiz);
        expect(nextQuiz.answer).toBe(STRING_FRET_NOTES[nextQuiz.ques.string][nextQuiz.ques.fret]);
    });
});
