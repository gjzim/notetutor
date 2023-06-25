import { screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { renderWithProviders } from "../../helpers/test-utils";
import { AppState } from "../../store";
import Clock from "./Clock";

describe("Clock", () => {
    it("renders correctly", () => {
        renderWithProviders(<Clock />);
        expect(screen.getByText("00:00")).toBeInTheDocument();
    });

    it("updates time after each interval", () => {
        jest.useFakeTimers();
        renderWithProviders(<Clock />, {
            preloadedState: {
                game: {
                    playing: true,
                    time: 30,
                },
            } as AppState,
        });

        expect(screen.getByText("00:30")).toBeInTheDocument();
        act(() => {
            jest.advanceTimersByTime(5000);
        });
        expect(screen.getByText("00:35")).toBeInTheDocument();
    });

    it("does not update time if game is paused", () => {
        jest.useFakeTimers();
        renderWithProviders(<Clock />, {
            preloadedState: {
                game: {
                    playing: false,
                    time: 30,
                },
            } as AppState,
        });

        expect(screen.getByText("00:30")).toBeInTheDocument();
        act(() => {
            jest.advanceTimersByTime(5000);
        });
        expect(screen.getByText("00:30")).toBeInTheDocument();
    });
});
