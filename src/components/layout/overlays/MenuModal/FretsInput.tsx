import Option from "../../../UI/Form/Option";
import Checkbox from "../../../UI/Form/Checkbox";
import { FRETS } from "../../../../constants/guitar";
import styles from "./MenuModal.module.css";

export type FretsInputProp = {
    onSelectionChange: React.ChangeEventHandler<HTMLSelectElement>;
    onCheckboxChange: React.ChangeEventHandler<HTMLInputElement>;
    selectedFrets: number[];
};

export function FretsInput({ onSelectionChange, onCheckboxChange, selectedFrets }: FretsInputProp) {
    return (
        <Option label="Frets" id="frets-select">
            <select name="frets" id="frets-select" value={selectedFrets.join()} onChange={onSelectionChange}>
                <option value="">Custom</option>
                <option value="0,1,2,3,4,5,6,7,8,9,10,11,12,13">All</option>
                <option value="1,2,3,4,5">1-5</option>
                <option value="6,7,8,9,10,11,12">6-12</option>
            </select>

            <div className={styles.FretCheckboxesWrap}>
                {FRETS.map((f) => (
                    <Checkbox
                        key={`fret_${f}`}
                        id={`fret_${f}`}
                        className={styles.FretCheckbox}
                        name="fret"
                        label={f.toString()}
                        value={f}
                        checked={selectedFrets.includes(f)}
                        onChange={onCheckboxChange}
                    />
                ))}
            </div>
        </Option>
    );
}
