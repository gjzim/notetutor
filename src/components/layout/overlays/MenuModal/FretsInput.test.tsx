import { render, screen } from "@testing-library/react";
import { addRootAndOverlaysElementsInDom, removeRootElementFromDom } from "../../../../helpers/test-utils";
import userEvent from "@testing-library/user-event";
import { DEFAULT_OPTIONS } from "../../../../constants/options";
import { FretsInput } from "./FretsInput";

beforeAll(addRootAndOverlaysElementsInDom);
afterAll(removeRootElementFromDom);

describe("FretsInput", () => {
    it("renders correctly", () => {
        render(
            <FretsInput
                onSelectionChange={jest.fn()}
                onCheckboxChange={jest.fn()}
                selectedFrets={DEFAULT_OPTIONS.frets}
            />
        );

        const fretsSelector = screen.getByRole("combobox", { name: /frets:/i }) as HTMLSelectElement;
        expect(fretsSelector).toBeInTheDocument();
        expect(fretsSelector.value).toBe(DEFAULT_OPTIONS.frets.join(","));

        DEFAULT_OPTIONS.frets.forEach((value) => {
            const fretCheckbox = screen.getByRole("checkbox", { name: value.toString() });
            expect(fretCheckbox).toBeInTheDocument();
            expect(fretCheckbox).toBeChecked();
        });
    });

    it("calls selection and checkbox change handlers correctly", async () => {
        userEvent.setup();
        const onSelectionChangeHandlerMock = jest.fn();
        const onCheckboxChangeHandlerMock = jest.fn();

        render(
            <FretsInput
                onSelectionChange={onSelectionChangeHandlerMock}
                onCheckboxChange={onCheckboxChangeHandlerMock}
                selectedFrets={DEFAULT_OPTIONS.frets}
            />
        );

        const fretsSelector = screen.getByRole("combobox", { name: /frets:/i }) as HTMLSelectElement;
        await userEvent.selectOptions(fretsSelector, "1,2,3,4,5");
        expect(onSelectionChangeHandlerMock).toBeCalled();

        const firstFretCheckbox = screen.getByRole("checkbox", { name: "1" });
        await userEvent.click(firstFretCheckbox);
        expect(onCheckboxChangeHandlerMock).toBeCalled();
    });
});
