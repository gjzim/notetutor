import Option from "../../../UI/Form/Option";
import Checkbox from "../../../UI/Form/Checkbox";
import styles from "./MenuModal.module.css";

const STRING_OPTIONS = [
    { id: "string_1", label: "1(E)", value: 1 },
    { id: "string_2", label: "2(B)", value: 2 },
    { id: "string_3", label: "3(G)", value: 3 },
    { id: "string_4", label: "4(D)", value: 4 },
    { id: "string_5", label: "5(A)", value: 5 },
    { id: "string_6", label: "6(e)", value: 6 },
];

export type StringsInputProp = {
    onSelectionChange: React.ChangeEventHandler<HTMLSelectElement>;
    onCheckboxChange: React.ChangeEventHandler<HTMLInputElement>;
    selectedStrings: number[];
};

export function StringsInput({ onSelectionChange, onCheckboxChange, selectedStrings }: StringsInputProp) {
    return (
        <Option label="Strings" id="strings">
            <select name="strings" id="strings" value={selectedStrings.join()} onChange={onSelectionChange}>
                <option value="">Custom</option>
                <option value="1,2,3,4,5,6">All</option>
                <option value="1,2,3">1-3</option>
                <option value="4,5,6">4-6</option>
            </select>

            <div className={styles.StringCheckboxesWrap}>
                {STRING_OPTIONS.map((s) => (
                    <Checkbox
                        key={s.id}
                        id={s.id}
                        className={styles.StringCheckbox}
                        name="string"
                        label={s.label}
                        value={s.value}
                        checked={selectedStrings.includes(s.value)}
                        onChange={onCheckboxChange}
                    />
                ))}
            </div>
        </Option>
    );
}
