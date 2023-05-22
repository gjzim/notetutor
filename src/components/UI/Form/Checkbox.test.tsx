import { screen, render } from "@testing-library/react";
import Checkbox from "./Checkbox";

describe("Checkbox", () => {
    const testProps = {
        id: "test-checkbox",
        name: "string",
        label: "Test checkbox",
        value: "1",
        checked: false,
        onChange: () => {},
    };

    it("renders correctly", () => {
        render(<Checkbox {...testProps} />);
        const checkbox = screen.getByRole("checkbox", {
            name: /test checkbox/i,
        });
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).not.toBeChecked();
    });
});
