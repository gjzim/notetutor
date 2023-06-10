import { render, screen } from "@testing-library/react";
import Modal from "./Modal";
import userEvent from "@testing-library/user-event";
import { addRootAndOverlaysElementsInDom, removeRootElementFromDom } from "../../../helpers/test-utils";

beforeAll(addRootAndOverlaysElementsInDom);
afterAll(removeRootElementFromDom);

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
