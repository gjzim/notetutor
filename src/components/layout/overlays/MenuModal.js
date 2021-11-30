import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { gameDefaultOptions } from "../../../store/game-default-options";
import { gameActions } from "../../../store/game-slice";

import Modal from "../../UI/Modal/Modal";
import Option from "../../UI/Form/Option";
import Checkbox from "../../UI/Form/Checkbox";
import Button from "../../UI/Button";
import ModalControls from "../../UI/Modal/ModalControls";
import ConfirmModal from "./ConfirmModal";
import InfoModal from "./InfoModal";
import styles from "./MenuModal.module.css";

const STRINGS = [
  { id: "string_1", label: "1(E)", value: 1 },
  { id: "string_2", label: "2(B)", value: 2 },
  { id: "string_3", label: "3(G)", value: 3 },
  { id: "string_4", label: "4(D)", value: 4 },
  { id: "string_5", label: "5(A)", value: 5 },
  { id: "string_6", label: "6(e)", value: 6 },
];

const FRETS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

function MenuModal(props) {
  const options = useSelector((state) => state.game.options);
  const dispatch = useDispatch();

  const [selectedTotalQues, setSelectedTotalQues] = useState(options.totalQues);
  const [selectedStrings, setSelectedStrings] = useState(options.strings);
  const [selectedFrets, setSelectedFrets] = useState(options.frets);

  const [showResetModal, setShowResetModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleSelectChange = (event) => {
    const stateUpdater =
      event.target.name === "strings" ? setSelectedStrings : setSelectedFrets;

    const value = event.target.value
      ? event.target.value.split(",").map((i) => +i)
      : [];

    stateUpdater(value);
  };

  const handleCheckboxChange = (event) => {
    const selectedVal = +event.target.value;
    const stateUpdater =
      event.target.name === "string" ? setSelectedStrings : setSelectedFrets;

    stateUpdater((prevState) => {
      if (prevState.includes(selectedVal)) {
        return [...prevState].filter((i) => i !== selectedVal);
      } else {
        return [...prevState, selectedVal].sort();
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
    dispatch(gameActions.updateOptions(updatedOptions));

    try {
      window.localStorage.setItem(
        "nt-game-options",
        JSON.stringify(updatedOptions)
      );
    } catch (error) {
      setShowErrorModal(true);
    }

    setShowSuccessModal(true);
  };

  const handleCloseClick = () => {
    if (JSON.stringify(options) !== JSON.stringify(getUpdatedOptions())) {
      setShowSaveModal(true);
    } else {
      props.onClose();
    }
  };

  const hideStringsCheckboxes = ["1,2,3,4,5,6", "1,2,3", "4,5,6"].includes(
    selectedStrings.join()
  );
  const hideFretsCheckboxes = [
    "0,1,2,3,4,5,6,7,8,9,10,11,12,13",
    "1,2,3,4,5",
    "6,7,8,9,10,11,12",
  ].includes(selectedFrets.join());

  return (
    <Modal
      header="Menu"
      className={styles.MenuModal}
      onBackdropClick={props.onClose}
    >
      <div className="MenuOptions">
        <Option label="Total Questions" id="total_ques">
          <input
            type="range"
            min="10"
            max="99"
            value={selectedTotalQues}
            className={styles.TotalQues}
            onInput={(event) => setSelectedTotalQues(+event.target.value)}
          />
          <span id="total_ques_display" className={styles.TotalQuesDisp}>
            {selectedTotalQues}
          </span>
        </Option>

        <Option label="Strings" id="strings">
          <select
            name="strings"
            value={selectedStrings.join()}
            onChange={handleSelectChange}
          >
            <option value="">Custom</option>
            <option value="1,2,3,4,5,6">All</option>
            <option value="1,2,3">Top Three</option>
            <option value="4,5,6">Bottom Three</option>
          </select>

          {!hideStringsCheckboxes && (
            <div className={styles.StringCheckboxesWrap}>
              {STRINGS.map((s) => (
                <Checkbox
                  key={s.id}
                  id={s.id}
                  className={styles.StringCheckbox}
                  name="string"
                  label={s.label}
                  value={s.value}
                  checked={selectedStrings.includes(s.value)}
                  onChange={handleCheckboxChange}
                />
              ))}
            </div>
          )}
        </Option>

        <Option label="Frets" id="frets">
          <select
            name="frets"
            id="frets-select"
            value={selectedFrets.join()}
            onChange={handleSelectChange}
          >
            <option value="">Custom</option>
            <option value="0,1,2,3,4,5,6,7,8,9,10,11,12,13">All</option>
            <option value="1,2,3,4,5">1-5</option>
            <option value="6,7,8,9,10,11,12">6-12</option>
          </select>

          {!hideFretsCheckboxes && (
            <div className={styles.FretCheckboxesWrap}>
              {FRETS.map((f) => (
                <Checkbox
                  key={`fret_${f}`}
                  id={`fret_${f}`}
                  className={styles.FretCheckbox}
                  name="fret"
                  label={f}
                  value={f}
                  checked={selectedFrets.includes(f)}
                  onChange={handleCheckboxChange}
                />
              ))}
            </div>
          )}
        </Option>
      </div>

      <ModalControls>
        <Button type="small" onClick={() => setShowResetModal(true)}>
          Reset
        </Button>
        <div>
          <Button type="small" onClick={saveUpdatedOptions}>
            Save
          </Button>
          <Button type="small" onClick={handleCloseClick}>
            Close
          </Button>
        </div>
      </ModalControls>

      {showResetModal && (
        <ConfirmModal
          text="Do you really want to reset game options to default?"
          onConfirm={() => {
            setSelectedTotalQues(gameDefaultOptions.totalQues);
            setSelectedStrings(gameDefaultOptions.strings);
            setSelectedFrets(gameDefaultOptions.frets);
            setShowResetModal(false);
          }}
          onReject={() => setShowResetModal(false)}
          onClose={() => setShowResetModal(false)}
        />
      )}

      {showSaveModal && (
        <ConfirmModal
          text="There are unsaved changes. Do you really want to close?"
          onConfirm={props.onClose}
          onReject={() => setShowSaveModal(false)}
          onClose={() => setShowSaveModal(false)}
        />
      )}

      {showSuccessModal && (
        <InfoModal
          text="Settings successfully updated. New settings will take effect from the next question/new game."
          onClose={() => setShowSuccessModal(false)}
        />
      )}

      {showErrorModal && (
        <InfoModal
          text="Something has gone wrong. Please try again later."
          onClose={() => setShowErrorModal(false)}
        />
      )}
    </Modal>
  );
}

export default MenuModal;
