import { screen, render } from "@testing-library/react";
import Button from "./Button";
import userEvent from "@testing-library/user-event";

describe("Button", () => {
    it("renders correctly", () => {
        render(<Button onClick={() => {}}>Button</Button>);
        const button = screen.getByRole("button", {
            name: /button/i,
        });

        expect(button).toBeInTheDocument();
        expect(button.classList).toContain("Button");
    });

    it("renders small button for type=small", () => {
        render(
            <Button onClick={() => {}} type="small">
                Small Button
            </Button>
        );
        const smallButton = screen.getByRole("button", {
            name: /small button/i,
        });

        expect(smallButton.classList).toContain("Small");
    });

    it("calls onClick on click", async () => {
        userEvent.setup();
        const onClickHandlerMock = jest.fn();
        render(<Button onClick={onClickHandlerMock}>Button</Button>);
        const button = screen.getByRole("button", {
            name: /button/i,
        });

        await userEvent.click(button);
        expect(onClickHandlerMock).toBeCalledTimes(1);
    });
});
