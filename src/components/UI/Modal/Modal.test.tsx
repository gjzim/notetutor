import { render, screen } from "@testing-library/react";
import Modal from "./Modal";
import userEvent from "@testing-library/user-event";

beforeAll(() => {
    // Set up a DOM element as a render target
    const rootEl = document.createElement("div");
    rootEl.setAttribute("id", "root");
    const overlays = document.createElement("aside");
    overlays.setAttribute("id", "overlays");
    rootEl.appendChild(overlays);
    document.body.appendChild(rootEl);
});

afterAll(() => {
    // eslint-disable-next-line
    document.getElementById("root")!.remove();
});

describe("Modal", () => {
    it("renders correctly", async () => {
        userEvent.setup();
        const onBackDropClickMock = jest.fn();
        render(
            <Modal header="Modal header" onBackdropClick={onBackDropClickMock}>
                <div>Modal body</div>
            </Modal>
        );

        const header = screen.getByRole("heading", {
            name: /modal header/i,
        });
        const backdrop = screen.getByTestId("modal-backdrop");

        expect(header).toBeInTheDocument();
        await userEvent.click(backdrop);
        expect(onBackDropClickMock).toHaveBeenCalled();
    });
});
