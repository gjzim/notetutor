export type OptionsType = {
    totalQues: number;
    strings: number[];
    frets: number[];
};

export const DEFAULT_OPTIONS: OptionsType = {
    totalQues: 30,
    strings: [1, 2, 3, 4, 5, 6],
    frets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
};
