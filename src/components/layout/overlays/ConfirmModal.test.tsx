import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { addRootAndOverlaysElementsInDom, removeRootElementFromDom } from "../../../helpers/test-utils";
import ConfirmModal from "./ConfirmModal";

beforeAll(addRootAndOverlaysElementsInDom);
afterAll(removeRootElementFromDom);

describe("ConfirmModal", () => {
    it("renders correctly", () => {
        render(<ConfirmModal text="please confirm" onClose={() => {}} onConfirm={() => {}} onReject={() => {}} />);

        const textContent = screen.getByText(/please confirm/i);
        expect(textContent).toBeInTheDocument();
        const yesButton = screen.getByRole("button", {
            name: /yes/i,
        });
        expect(yesButton).toBeInTheDocument();
        const noButton = screen.getByRole("button", {
            name: /no/i,
        });
        expect(noButton).toBeInTheDocument();
    });

    it("calls correct handler callbacks", async () => {
        userEvent.setup();
        const onConfirmHandlerMock = jest.fn();
        const onRejectHandlerMock = jest.fn();

        render(
            <ConfirmModal
                text="please confirm"
                onClose={() => {}}
                onConfirm={onConfirmHandlerMock}
                onReject={onRejectHandlerMock}
            />
        );

        const yesButton = screen.getByRole("button", {
            name: /yes/i,
        });
        await userEvent.click(yesButton);
        expect(onConfirmHandlerMock).toBeCalled();

        const noButton = screen.getByRole("button", {
            name: /no/i,
        });
        await userEvent.click(noButton);
        expect(onRejectHandlerMock).toBeCalled();
    });
});
