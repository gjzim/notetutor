import { screen, render } from "@testing-library/react";
import Checkbox from "./Checkbox";
import userEvent from "@testing-library/user-event";

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

    it("calls onChange on check", async () => {
        userEvent.setup();
        const onChangeHandlerMock = jest.fn();
        render(<Checkbox {...testProps} onChange={onChangeHandlerMock} />);
        const checkbox = screen.getByRole("checkbox", {
            name: /test checkbox/i,
        });
        await userEvent.click(checkbox);
        expect(onChangeHandlerMock).toHaveBeenCalledTimes(1);
    });
});
