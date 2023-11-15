import { useState } from "react";
import { optionsActions } from "../../../../store/options-slice";
import { DEFAULT_OPTIONS } from "../../../../constants/options";
import Modal from "../../../UI/Modal/Modal";
import Option from "../../../UI/Form/Option";
import Button from "../../../UI/Button";
import ModalControls from "../../../UI/Modal/ModalControls";
import ConfirmModal from "../ConfirmModal";
import InfoModal from "../InfoModal";
import styles from "./MenuModal.module.css";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { StringsInput } from "./StringsInput";
import { FretsInput } from "./FretsInput";

function MenuModal({ onClose }: { onClose: () => void }) {
    const options = useAppSelector((state) => state.options);
    const dispatch = useAppDispatch();

    const [selectedTotalQues, setSelectedTotalQues] = useState(options.totalQues);
    const [selectedStrings, setSelectedStrings] = useState(options.strings);
    const [selectedFrets, setSelectedFrets] = useState(options.frets);

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const [showResetModal, setShowResetModal] = useState(false);
    const [showSaveModal, setShowSaveModal] = useState(false);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const stateUpdater = event.target.name === "strings" ? setSelectedStrings : setSelectedFrets;
        const value = event.target.value ? event.target.value.split(",").map((i) => +i) : [];

        stateUpdater(value);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedVal = +event.target.value;
        const stateUpdater = event.target.name === "string" ? setSelectedStrings : setSelectedFrets;

        stateUpdater((prevState) => {
            if (event.target.checked) {
                return [...prevState, selectedVal].sort();
            } else {
                return prevState.filter((val) => val !== selectedVal);
            }
        });
    };

    const getUpdatedOptions = () => {
        const updatedOptions = {
            totalQues: +selectedTotalQues,
            strings: selectedStrings,
            frets: selectedFrets,
        };

        if (updatedOptions.totalQues < 1 || updatedOptions.totalQues > 99) {
            updatedOptions.totalQues = 20;
        }

        return updatedOptions;
    };

    const saveUpdatedOptions = () => {
        const updatedOptions = getUpdatedOptions();
        if (updatedOptions.strings.length === 0 || updatedOptions.frets.length === 0) {
            setError("Please select at least one string and fret.");
            return;
        }

        dispatch(optionsActions.updateOptions(updatedOptions));

        window.localStorage.setItem("nt-game-options", JSON.stringify(updatedOptions));
        setSuccess("Settings successfully updated. New settings will take effect from the next question/new game.");
    };

    const handleCloseClick = () => {
        if (JSON.stringify(options) !== JSON.stringify(getUpdatedOptions())) {
            setShowSaveModal(true);
        } else {
            onClose();
        }
    };

    return (
        <Modal header="Menu" className={styles.MenuModal} onBackdropClick={handleCloseClick}>
            <>
                <div className="MenuOptions">
                    <Option label="Total Questions" id="total_ques">
                        <input
                            type="range"
                            min="10"
                            max="99"
                            value={selectedTotalQues}
                            className={styles.TotalQues}
                            id="total_ques"
                            onChange={(event) => setSelectedTotalQues(+event.target.value)}
                        />
                        <span id="total_ques_display" className={styles.TotalQuesDisp}>
                            {selectedTotalQues}
                        </span>
                    </Option>

                    <StringsInput
                        onSelectionChange={handleSelectChange}
                        onCheckboxChange={handleCheckboxChange}
                        selectedStrings={selectedStrings}
                    />

                    <FretsInput
                        onSelectionChange={handleSelectChange}
                        onCheckboxChange={handleCheckboxChange}
                        selectedFrets={selectedFrets}
                    />
                </div>

                <ModalControls>
                    <Button type="small" onClick={() => setShowResetModal(true)} data-cy="mm-reset-btn">
                        Reset
                    </Button>
                    <div>
                        <Button type="small" onClick={saveUpdatedOptions} data-cy="mm-save-btn">
                            Save
                        </Button>
                        <Button type="small" onClick={handleCloseClick} data-cy="mm-close-btn">
                            Close
                        </Button>
                    </div>
                </ModalControls>

                {showResetModal && (
                    <ConfirmModal
                        text="Do you really want to reset game options to default?"
                        onConfirm={() => {
                            setSelectedTotalQues(DEFAULT_OPTIONS.totalQues);
                            setSelectedStrings(DEFAULT_OPTIONS.strings);
                            setSelectedFrets(DEFAULT_OPTIONS.frets);
                            setShowResetModal(false);
                        }}
                        onReject={() => setShowResetModal(false)}
                        onClose={() => setShowResetModal(false)}
                    />
                )}

                {showSaveModal && (
                    <ConfirmModal
                        text="There are unsaved changes. Do you really want to close?"
                        onConfirm={onClose}
                        onReject={() => setShowSaveModal(false)}
                        onClose={() => setShowSaveModal(false)}
                    />
                )}

                {success && <InfoModal text={success} onClose={() => setSuccess("")} />}
                {error && <InfoModal text={error} onClose={() => setError("")} />}
            </>
        </Modal>
    );
}

export default MenuModal;
