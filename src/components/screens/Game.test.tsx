import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
    addRootAndOverlaysElementsInDom,
    removeRootElementFromDom,
    renderWithProviders,
} from "../../helpers/test-utils";
import Game from "./Game";
import { STRING_FRET_POSITIONS } from "../../constants/guitar";
import { act } from "react-dom/test-utils";

beforeAll(addRootAndOverlaysElementsInDom);
afterAll(removeRootElementFromDom);

const mockGameInitState = {
    playing: true,
    quiz: {
        current: {
            serial: 1,
            ques: {
                string: 1,
                fret: 1,
            },
            answer: "f",
            options: ["a", "b", "c", "d", "f"],
        },
        prev: null,
    },
    score: 0,
    time: 0,
};

const mockGameState = {
    playing: true,
    quiz: {
        current: {
            serial: 5,
            ques: {
                string: 1,
                fret: 1,
            },
            answer: "f",
            options: ["a", "b", "c", "d", "f"],
        },
        prev: {
            serial: 4,
            string: 3,
            fret: 1,
        },
    },
    score: 3,
    time: 61,
};

describe("Game", () => {
    it("renders correctly", () => {
        renderWithProviders(<Game />, {
            preloadedState: {
                game: mockGameInitState,
            },
        });

        expect(
            screen.getByRole("img", {
                name: /notetutor logo/i,
            })
        ).toBeInTheDocument();

        const [top, left] = STRING_FRET_POSITIONS[1][1];
        const questionIcon = screen.getByTestId("question-icon");
        expect(questionIcon).toBeInTheDocument();
        expect(questionIcon.style.top).toBe(`${top}px`);
        expect(questionIcon.style.left).toBe(`${left}px`);

        expect(screen.getByRole("heading").textContent).toBe("Q1: Select the right note");
        expect(screen.getByTestId("clock-display")).toHaveTextContent("00:00");
    });

    it("pauses and resumes the game properly", async () => {
        jest.useFakeTimers();
        const user = userEvent.setup({ delay: null });

        renderWithProviders(<Game />, {
            preloadedState: {
                game: mockGameInitState,
            },
        });

        const pauseBtn = screen.getByRole("button", {
            name: /pause/i,
        });

        const clockDisplayElement = screen.getByTestId("clock-display");
        expect(clockDisplayElement).toHaveTextContent("00:00");
        await user.click(pauseBtn);
        act(() => {
            jest.advanceTimersByTime(5000);
        });
        expect(clockDisplayElement).toHaveTextContent("00:00");

        await user.click(
            screen.getByRole("button", {
                name: /resume/i,
            })
        );
        act(() => {
            jest.advanceTimersByTime(5000);
        });
        expect(clockDisplayElement).toHaveTextContent("00:05");

        jest.useRealTimers();
    });

    it("restarts game properly on restart button click", async () => {
        jest.useFakeTimers();
        const user = userEvent.setup({ delay: null });

        renderWithProviders(<Game />, {
            preloadedState: {
                game: mockGameState,
            },
        });

        expect(screen.getByRole("heading").textContent).toBe("Q5: Select the right note");
        expect(screen.getByTestId("clock-display")).toHaveTextContent("01:01");

        await user.click(
            screen.getByRole("button", {
                name: /restart/i,
            })
        );
        await user.click(
            screen.getByRole("button", {
                name: /yes/i,
            })
        );

        expect(screen.getByRole("heading").textContent).toBe("Q1: Select the right note");
        expect(screen.getByTestId("clock-display")).toHaveTextContent("00:00");

        jest.useRealTimers();
    });

    it("restarts game properly on pause -> restart button click", async () => {
        jest.useFakeTimers();
        const user = userEvent.setup({ delay: null });

        renderWithProviders(<Game />, {
            preloadedState: {
                game: mockGameState,
            },
        });

        expect(screen.getByRole("heading").textContent).toBe("Q5: Select the right note");
        expect(screen.getByTestId("clock-display")).toHaveTextContent("01:01");

        await user.click(
            screen.getByRole("button", {
                name: /pause/i,
            })
        );

        await user.click(
            screen.getAllByRole("button", {
                name: /restart/i,
            })[0]
        );

        // await user.click(
        //     container.getElementById("overlays").getByRole("button", {
        //         name: /restart/i,
        //     })
        // );

        await user.click(
            screen.getByRole("button", {
                name: /yes/i,
            })
        );

        expect(screen.getByRole("heading").textContent).toBe("Q1: Select the right note");
        expect(screen.getByTestId("clock-display")).toHaveTextContent("00:00");

        jest.useRealTimers();
    });
});
