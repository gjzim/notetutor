import { render, screen } from "@testing-library/react";
import { STRING_FRET_POSITIONS } from "../../constants/guitar";
import Fretboard from "./Fretboard";

describe("Fretboard", () => {
    it("renders correctly", () => {
        const string = 2;
        const fret = 3;
        render(<Fretboard string={string} fret={fret} />);

        const [top, left] = STRING_FRET_POSITIONS[string][fret];
        const questionMark = screen.getByText(/\?/i);
        expect(questionMark.style.top).toBe(`${top}px`);
        expect(questionMark.style.left).toBe(`${left}px`);
    });
});
