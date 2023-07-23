import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
    addRootAndOverlaysElementsInDom,
    removeRootElementFromDom,
    renderWithProviders,
} from "../../helpers/test-utils";
import End from "./End";
import App from "../../App";

beforeAll(addRootAndOverlaysElementsInDom);
afterAll(removeRootElementFromDom);

describe("End", () => {
    it("renders correctly", () => {
        renderWithProviders(<End />);

        expect(
            screen.getByRole("img", {
                name: /notetutor logo/i,
            })
        ).toBeInTheDocument();

        expect(screen.getByText(/score: \d+\/\d+/i)).toBeInTheDocument();
        expect(screen.getByText(/time: \d+:\d+/i)).toBeInTheDocument();

        expect(
            screen.getByRole("button", {
                name: /play again/i,
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", {
                name: /go back/i,
            })
        ).toBeInTheDocument();

        const websiteLink = screen.getByRole("link", {
            name: /gul jamal zim/i,
        });
        expect(websiteLink).toBeInTheDocument();
        expect(websiteLink.getAttribute("href")).toBe("http://gjzim.com");
    });

    it("renders game screen on play again button click", async () => {
        userEvent.setup();
        renderWithProviders(<App />, {
            preloadedState: {
                ui: {
                    currentScreen: "end",
                },
            },
        });

        await userEvent.click(
            screen.getByRole("button", {
                name: /play again/i,
            })
        );

        expect(screen.getByRole("heading").textContent).toBe("Q1: Select the right note");

        expect(
            screen.getByRole("button", {
                name: /pause/i,
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", {
                name: /restart/i,
            })
        ).toBeInTheDocument();
    });

    it("renders start screen on go back button click", async () => {
        userEvent.setup();
        renderWithProviders(<App />, {
            preloadedState: {
                ui: {
                    currentScreen: "end",
                },
            },
        });

        await userEvent.click(
            screen.getByRole("button", {
                name: /go back/i,
            })
        );

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
    });
});
