import { screen, render } from "@testing-library/react";
import Button from "./Button";

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
});
