import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
    addRootAndOverlaysElementsInDom,
    removeRootElementFromDom,
    renderWithProviders,
} from "../../helpers/test-utils";
import App from "../../App";
import Game from "./Game";
import { STRING_FRET_POSITIONS } from "../../constants/guitar";

beforeAll(addRootAndOverlaysElementsInDom);
afterAll(removeRootElementFromDom);

const mockGameState = {
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

describe("End", () => {
    it("renders correctly", () => {
        renderWithProviders(<Game />, {
            preloadedState: {
                game: mockGameState,
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
});
