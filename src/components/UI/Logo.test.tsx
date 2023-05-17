import { screen, render } from "@testing-library/react";
import Logo from "./Logo";

describe("Logo", () => {
    it("renders correctly", () => {
        render(<Logo />);

        const logoImg = screen.getByAltText("Notetutor logo");
        expect(logoImg).toBeInTheDocument();
    });
});
