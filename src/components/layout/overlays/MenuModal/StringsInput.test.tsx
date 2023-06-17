import { render, screen } from "@testing-library/react";
import { addRootAndOverlaysElementsInDom, removeRootElementFromDom } from "../../../../helpers/test-utils";
import userEvent from "@testing-library/user-event";
import { DEFAULT_OPTIONS } from "../../../../constants/options";
import { StringsInput } from "./StringsInput";

beforeAll(addRootAndOverlaysElementsInDom);
afterAll(removeRootElementFromDom);

describe("StringsInput", () => {
    it("renders correctly", () => {
        render(
            <StringsInput
                onSelectionChange={jest.fn()}
                onCheckboxChange={jest.fn()}
                selectedStrings={DEFAULT_OPTIONS.strings}
            />
        );

        const stringsSelector = screen.getByRole("combobox", { name: /strings:/i }) as HTMLSelectElement;
        expect(stringsSelector).toBeInTheDocument();
        expect(stringsSelector.value).toBe(DEFAULT_OPTIONS.strings.join(","));

        expect(screen.getByRole("checkbox", { name: /1\(e\)/i })).toBeInTheDocument();
        expect(screen.getByRole("checkbox", { name: /2\(b\)/i })).toBeInTheDocument();
        expect(screen.getByRole("checkbox", { name: /3\(g\)/i })).toBeInTheDocument();
        expect(screen.getByRole("checkbox", { name: /4\(d\)/i })).toBeInTheDocument();
        expect(screen.getByRole("checkbox", { name: /5\(a\)/i })).toBeInTheDocument();
        expect(screen.getByRole("checkbox", { name: /6\(e\)/i })).toBeInTheDocument();

        DEFAULT_OPTIONS.strings.forEach((value) => {
            expect(screen.getByDisplayValue(value)).toBeChecked();
        });
    });

    it("calls selection and checkbox change handlers correctly", async () => {
        userEvent.setup();
        const onSelectionChangeHandlerMock = jest.fn();
        const onCheckboxChangeHandlerMock = jest.fn();

        render(
            <StringsInput
                onSelectionChange={onSelectionChangeHandlerMock}
                onCheckboxChange={onCheckboxChangeHandlerMock}
                selectedStrings={DEFAULT_OPTIONS.strings}
            />
        );

        const stringsSelector = screen.getByRole("combobox", { name: /strings:/i }) as HTMLSelectElement;
        await userEvent.selectOptions(stringsSelector, "1,2,3");
        expect(onSelectionChangeHandlerMock).toBeCalled();

        const firstStringCheckbox = screen.getByRole("checkbox", { name: /1\(e\)/i });
        await userEvent.click(firstStringCheckbox);
        expect(onCheckboxChangeHandlerMock).toBeCalled();
    });
});
