import { useState } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../store/ui-slice";

import Button from "../../UI/Button";
import Modal from "../../UI/Modal/Modal";
import styles from "./PauseModal.module.css";
import ConfirmModal from "./ConfirmModal";

function PauseModal(props) {
  const [showRestartConfirm, setShowRestartConfirm] = useState(false);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  const dispatch = useDispatch();

  return (
    <Modal
      header="Pause"
      className={styles.PauseModal}
      onBackdropClick={props.onClose}
    >
      <Button onClick={props.onClose}>Resume</Button>
      <Button onClick={() => setShowRestartConfirm(true)}>Restart</Button>
      <Button onClick={() => setShowQuitConfirm(true)}>Quit</Button>

      {showRestartConfirm && (
        <ConfirmModal
          text="Do you really want to restart the game?"
          onReject={() => setShowRestartConfirm(false)}
          onClose={() => setShowRestartConfirm(false)}
        />
      )}

      {showQuitConfirm && (
        <ConfirmModal
          text="Do you really want to quit the game?"
          onConfirm={() => dispatch(uiActions.changeScreen('start'))}
          onReject={() => setShowQuitConfirm(false)}
          onClose={() => setShowQuitConfirm(false)}
        />
      )}
    </Modal>
  );
}

export default PauseModal;
