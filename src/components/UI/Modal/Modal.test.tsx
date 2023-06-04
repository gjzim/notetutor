import { render, screen } from "@testing-library/react";
import Modal from "./Modal";

describe("Modal", () => {
    it("renders correctly", () => {
        const onBackDropClickMock = jest.fn();
        render(
            <Modal header="Modal header" onBackdropClick={onBackDropClickMock}>
                <div>Modal body</div>
            </Modal>
        );
    });
});
