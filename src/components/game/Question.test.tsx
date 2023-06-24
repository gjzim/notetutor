import { screen, within } from "@testing-library/react";
import { renderWithProviders } from "../../helpers/test-utils";
import Question from "./Question";

describe("Question", () => {
    it("renders correctly", () => {
        const options = ["a", "b", "c", "d", "e"];
        renderWithProviders(<Question serial={2} options={["a", "b", "c", "d", "e"]} onChoiceClick={jest.fn()} />);

        expect(screen.getByRole("heading").textContent).toBe("Q2: Select the right note");

        const optionElements = screen.getAllByRole("listitem");
        expect(optionElements).toHaveLength(options.length);
        optionElements.forEach((oel, index) => {
            const { getByText } = within(oel);
            expect(getByText(options[index])).toBeInTheDocument();
        });
    });
});
