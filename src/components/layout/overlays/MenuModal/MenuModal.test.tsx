import { screen } from "@testing-library/react";
import {
    addRootAndOverlaysElementsInDom,
    removeRootElementFromDom,
    renderWithProviders,
} from "../../../../helpers/test-utils";
import userEvent from "@testing-library/user-event";
import MenuModal from "./MenuModal";
import { DEFAULT_OPTIONS } from "../../../../constants/options";

beforeAll(addRootAndOverlaysElementsInDom);
afterAll(removeRootElementFromDom);

describe("MenuModal", () => {
    it("renders correctly", () => {
        renderWithProviders(<MenuModal onClose={jest.fn()} />);

        expect(screen.getByText(/menu/i)).toBeInTheDocument();

        expect(screen.getByRole("combobox", { name: /strings:/i })).toBeInTheDocument();
        expect(screen.getByRole("combobox", { name: /frets:/i })).toBeInTheDocument();

        expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
    });

    it("renders total question slider correctly", () => {
        renderWithProviders(<MenuModal onClose={jest.fn()} />);

        const totalQuestionSlider = screen.getByRole("slider", { name: /total questions:/i }) as HTMLInputElement;
        expect(totalQuestionSlider).toBeInTheDocument();
        expect(+totalQuestionSlider.value).toBe(DEFAULT_OPTIONS.totalQues);
        expect(screen.getByText(DEFAULT_OPTIONS.totalQues)).toBeInTheDocument();
    });
});
