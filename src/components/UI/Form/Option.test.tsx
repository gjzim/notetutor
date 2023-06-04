import { render, screen } from "@testing-library/react";
import Option from "./Option";

describe("Option", () => {
    it("renders correctly", () => {
        render(
            <Option id="option-text" label="Option Label">
                <input name="option-text" />
            </Option>
        );

        const labelEl = screen.getByText(/option label/i);
        expect(labelEl).toBeInTheDocument();
    });
});
