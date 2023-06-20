import { screen, fireEvent } from "@testing-library/react";
import {
    addRootAndOverlaysElementsInDom,
    removeRootElementFromDom,
    renderWithProviders,
} from "../../../../helpers/test-utils";
import userEvent from "@testing-library/user-event";
import MenuModal from "./MenuModal";
import { DEFAULT_OPTIONS } from "../../../../constants/options";

beforeAll(addRootAndOverlaysElementsInDom);
afterAll(removeRootElementFromDom);

describe("MenuModal", () => {
    it("renders correctly", () => {
        renderWithProviders(<MenuModal onClose={jest.fn()} />);

        expect(screen.getByText(/menu/i)).toBeInTheDocument();

        expect(screen.getByRole("combobox", { name: /strings:/i })).toBeInTheDocument();
        expect(screen.getByRole("combobox", { name: /frets:/i })).toBeInTheDocument();

        expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
    });

    it("renders total question slider correctly", () => {
        renderWithProviders(<MenuModal onClose={jest.fn()} />);

        const totalQuestionSlider = screen.getByRole("slider", { name: /total questions:/i }) as HTMLInputElement;
        expect(totalQuestionSlider).toBeInTheDocument();
        expect(+totalQuestionSlider.value).toBe(DEFAULT_OPTIONS.totalQues);
        expect(screen.getByText(DEFAULT_OPTIONS.totalQues)).toBeInTheDocument();
    });

    it("shows and hides reset confirm modal properly", async () => {
        userEvent.setup();
        renderWithProviders(<MenuModal onClose={jest.fn()} />);

        await userEvent.click(screen.getByRole("button", { name: /reset/i }));
        expect(screen.getByText(/do you really want to reset game options to default\?/i)).toBeInTheDocument();
        await userEvent.click(screen.getByRole("button", { name: /yes/i }));
        expect(screen.queryByText(/do you really want to reset game options to default\?/i)).not.toBeInTheDocument();

        await userEvent.click(screen.getByRole("button", { name: /reset/i }));
        expect(screen.getByText(/do you really want to reset game options to default\?/i)).toBeInTheDocument();
        await userEvent.click(screen.getByRole("button", { name: /no/i }));
        expect(screen.queryByText(/do you really want to reset game options to default\?/i)).not.toBeInTheDocument();
    });

    it("resets settings on reset modal confirm", async () => {
        userEvent.setup();
        renderWithProviders(<MenuModal onClose={jest.fn()} />);

        const totalQuestionSlider = screen.getByRole("slider", { name: /total questions:/i }) as HTMLInputElement;
        fireEvent.change(totalQuestionSlider, { target: { value: 50 } });
        const stringsSelector = screen.getByRole("combobox", { name: /strings:/i }) as HTMLSelectElement;
        await userEvent.selectOptions(stringsSelector, "1,2,3");
        const fretsSelector = screen.getByRole("combobox", { name: /frets:/i }) as HTMLSelectElement;
        await userEvent.selectOptions(fretsSelector, "1,2,3,4,5");

        await userEvent.click(screen.getByRole("button", { name: /reset/i }));
        await userEvent.click(screen.getByRole("button", { name: /yes/i }));

        expect(totalQuestionSlider.value).toBe(DEFAULT_OPTIONS.totalQues.toString());
        expect(stringsSelector.value).toBe(DEFAULT_OPTIONS.strings.join(","));
        expect(fretsSelector.value).toBe(DEFAULT_OPTIONS.frets.join(","));
    });

    it("handles close button operations properly", async () => {
        userEvent.setup();
        const onCloseHandlerMock = jest.fn();
        renderWithProviders(<MenuModal onClose={onCloseHandlerMock} />);

        const closeButton = screen.getByRole("button", { name: /close/i });
        await userEvent.click(closeButton);
        expect(onCloseHandlerMock).toBeCalled();

        const stringsSelector = screen.getByRole("combobox", { name: /strings:/i }) as HTMLSelectElement;
        await userEvent.selectOptions(stringsSelector, "1,2,3");
        await userEvent.click(closeButton);
        expect(screen.getByText(/There are unsaved changes. Do you really want to close\?/i)).toBeInTheDocument();
        await userEvent.click(screen.getByRole("button", { name: /no/i }));
        expect(screen.queryByText(/There are unsaved changes. Do you really want to close\?/i)).not.toBeInTheDocument();

        await userEvent.selectOptions(stringsSelector, "1,2,3");
        await userEvent.click(closeButton);
        await userEvent.click(screen.getByRole("button", { name: /yes/i }));
        expect(onCloseHandlerMock).toBeCalled();
    });

    it("saves updated options properly", async () => {
        userEvent.setup();
        jest.spyOn(Storage.prototype, "setItem");
        jest.spyOn(Storage.prototype, "getItem");

        renderWithProviders(<MenuModal onClose={jest.fn()} />);

        const stringsSelector = screen.getByRole("combobox", { name: /strings:/i }) as HTMLSelectElement;
        await userEvent.selectOptions(stringsSelector, "1,2,3");

        const saveButton = screen.getByRole("button", { name: /save/i });
        await userEvent.click(saveButton);

        expect(
            screen.getByText(
                /Settings successfully updated. New settings will take effect from the next question\/new game/i
            )
        ).toBeInTheDocument();

        const updatedOptions = { ...DEFAULT_OPTIONS, strings: [1, 2, 3] };
        expect(localStorage.setItem).toHaveBeenCalledWith("nt-game-options", JSON.stringify(updatedOptions));
    });

    it("shows error properly", async () => {
        userEvent.setup();

        renderWithProviders(<MenuModal onClose={jest.fn()} />);

        const stringsSelector = screen.getByRole("combobox", { name: /strings:/i }) as HTMLSelectElement;
        await userEvent.selectOptions(stringsSelector, "1,2,3");
        await Promise.all([
            userEvent.click(screen.getByRole("checkbox", { name: /1\(e\)/i })),
            userEvent.click(screen.getByRole("checkbox", { name: /2\(b\)/i })),
            userEvent.click(screen.getByRole("checkbox", { name: /3\(g\)/i })),
        ]);

        const saveButton = screen.getByRole("button", { name: /save/i });
        await userEvent.click(saveButton);

        expect(screen.getByText(/Please select at least one string and fret/i)).toBeInTheDocument();
    });
});
