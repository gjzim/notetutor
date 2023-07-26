import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Choice from "./Choice";
import TIMINGS from "../../constants/timings";
import { act } from "react-dom/test-utils";

describe("Choice", () => {
    it("renders correctly", () => {
        render(<Choice note="a" answer="a" onClick={() => {}} />);
        expect(screen.getByText("a")).toBeInTheDocument();
    });

    it("renders correct choice properly", async () => {
        userEvent.setup();
        const onClickHandlerMock = jest.fn();
        const { container } = render(<Choice note="a" answer="a" onClick={onClickHandlerMock} />);

        const button = screen.getByRole("button", {
            name: /a/i,
        });
        await userEvent.click(button);

        expect(onClickHandlerMock).toBeCalledTimes(1);
        expect(onClickHandlerMock).toBeCalledWith("correct");

        /* eslint-disable testing-library/no-node-access */
        /* eslint-disable testing-library/no-container */
        expect(container.querySelector("svg.fa-check")).toBeInTheDocument();
    });

    it("renders wrong choice properly", async () => {
        userEvent.setup();
        const onClickHandlerMock = jest.fn();
        const { container } = render(<Choice note="a" answer="b" onClick={onClickHandlerMock} />);

        const button = screen.getByRole("button", {
            name: /a/i,
        });
        await userEvent.click(button);

        expect(onClickHandlerMock).toBeCalledTimes(1);
        expect(onClickHandlerMock).toBeCalledWith("wrong");

        /* eslint-disable testing-library/no-node-access */
        /* eslint-disable testing-library/no-container */
        expect(container.querySelector("svg.fa-xmark")).toBeInTheDocument();
    });

    it("disables button onClick and enables them again", async () => {
        jest.useFakeTimers();
        const user = userEvent.setup({ delay: null });

        render(<Choice note="a" answer="b" onClick={() => {}} />);

        const button = screen.getByRole("button", {
            name: /a/i,
        });
        await user.click(button);

        expect(button).toBeDisabled();
        act(() => {
            jest.advanceTimersByTime(TIMINGS.SHOW_ANSWER);
        });
        expect(button).toBeEnabled();
        jest.useRealTimers();
    });
});
