import { render, screen } from "@testing-library/react";
import InfoModal from "./InfoModal";
import userEvent from "@testing-library/user-event";
import { addRootAndOverlaysElementsInDom, removeRootElementFromDom } from "../../../helpers/test-utils";
import TIMINGS from "../../../constants/timings";

beforeAll(addRootAndOverlaysElementsInDom);
afterAll(removeRootElementFromDom);

describe("InfoModal", () => {
    it("renders correctly", () => {
        render(<InfoModal text="some info" onClose={() => {}} />);

        const infoText = screen.getByText(/some info/i);
        expect(infoText).toBeInTheDocument();

        const closeBtn = screen.getByRole("button", {
            name: /close/i,
        });
        expect(closeBtn).toBeInTheDocument();
    });

    it("calls on close handler", async () => {
        userEvent.setup();
        const onCloseHandlerMock = jest.fn();
        render(<InfoModal text="some info" onClose={onCloseHandlerMock} />);

        const closeBtn = screen.getByRole("button", {
            name: /close/i,
        });
        await userEvent.click(closeBtn);
        expect(onCloseHandlerMock).toBeCalled();
    });

    it("calls onclose handler automatically after modal auto hide time", () => {
        jest.useFakeTimers();
        const onCloseHandlerMock = jest.fn();
        render(<InfoModal text="some info" onClose={onCloseHandlerMock} />);

        expect(onCloseHandlerMock).not.toBeCalled();
        jest.advanceTimersByTime(TIMINGS.MODAL_AUTOHIDE);
        expect(onCloseHandlerMock).toHaveBeenCalledTimes(1);
    });
});
