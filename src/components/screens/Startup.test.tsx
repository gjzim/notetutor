import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
    addRootAndOverlaysElementsInDom,
    removeRootElementFromDom,
    renderWithProviders,
} from "../../helpers/test-utils";
import Startup from "./Startup";

beforeAll(addRootAndOverlaysElementsInDom);
afterAll(removeRootElementFromDom);

describe("Startup", () => {
    it("renders correctly", () => {
        renderWithProviders(<Startup />);

        expect(
            screen.getByRole("img", {
                name: /notetutor logo large/i,
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("heading", {
                name: /master your fretboard/i,
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", {
                name: /start playing/i,
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", {
                name: /customize/i,
            })
        ).toBeInTheDocument();

        const websiteLink = screen.getByRole("link", {
            name: /gul jamal zim/i,
        });
        expect(websiteLink).toBeInTheDocument();
        expect(websiteLink.getAttribute("href")).toBe("http://gjzim.com");
    });

    it("opens the menu modal on customize button click", async () => {
        userEvent.setup();
        renderWithProviders(<Startup />);

        const spBtn = screen.getByRole("button", {
            name: /customize/i,
        });

        expect(
            screen.queryByRole("heading", {
                name: /menu/i,
            })
        ).not.toBeInTheDocument();

        await userEvent.click(spBtn);

        expect(
            screen.getByRole("heading", {
                name: /menu/i,
            })
        ).toBeInTheDocument();
    });
});
