import { screen } from "@testing-library/react";
import {
    addRootAndOverlaysElementsInDom,
    removeRootElementFromDom,
    renderWithProviders,
} from "../../../helpers/test-utils";
import userEvent from "@testing-library/user-event";
import PauseModal from "./PauseModal";

beforeAll(addRootAndOverlaysElementsInDom);
afterAll(removeRootElementFromDom);

describe("PauseModal", () => {
    it("renders correctly", () => {
        renderWithProviders(<PauseModal onClose={() => {}} />);

        expect(screen.getByText(/pause/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /resume/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /restart/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /quit/i })).toBeInTheDocument();
    });

    it("calls onClose callback properly", async () => {
        userEvent.setup();
        const onCloseHandlerMock = jest.fn();
        renderWithProviders(<PauseModal onClose={onCloseHandlerMock} />);

        const resumeButton = screen.getByRole("button", { name: /resume/i });
        await userEvent.click(resumeButton);
        expect(onCloseHandlerMock).toHaveBeenCalledTimes(1);
    });

    it("shows and hides restart confirm modal properly", async () => {
        userEvent.setup();
        renderWithProviders(<PauseModal onClose={() => {}} />);

        const restartButton = screen.getByRole("button", { name: /restart/i });
        await userEvent.click(restartButton);
        expect(screen.getByText(/do you really want to restart the game\?/i)).toBeInTheDocument();

        const noButton = screen.getByRole("button", { name: /no/i });
        await userEvent.click(noButton);
        expect(screen.queryByText(/do you really want to restart the game\?/i)).not.toBeInTheDocument();
    });

    it("shows and hides quit confirm modal properly", async () => {
        userEvent.setup();
        renderWithProviders(<PauseModal onClose={() => {}} />);

        const quitButton = screen.getByRole("button", { name: /quit/i });
        await userEvent.click(quitButton);
        expect(screen.getByText(/do you really want to quit the game\?/i)).toBeInTheDocument();

        const noButton = screen.getByRole("button", { name: /no/i });
        await userEvent.click(noButton);
        expect(screen.queryByText(/do you really want to quit the game\?/i)).not.toBeInTheDocument();
    });
});
