import { useState } from "react";
import { useDispatch } from "react-redux";
import { start, stop } from "../../../store/game-actions";
import { gameActions } from "../../../store/game-slice";

import Button from "../../UI/Button";
import Modal from "../../UI/Modal/Modal";
import styles from "./PauseModal.module.css";
import ConfirmModal from "./ConfirmModal";

function PauseModal(props) {
  const [showRestartConfirm, setShowRestartConfirm] = useState(false);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  const dispatch = useDispatch();

  const handleRestartClick = () => {
    dispatch(gameActions.pause());
    setShowRestartConfirm(true);
  };

  const handleRestartConfirm = () => {
    setShowRestartConfirm(false);
    props.onClose();
    dispatch(start());
  };

  const handleRestartRejectClose = () => {
    dispatch(gameActions.resume());
    setShowRestartConfirm(false);
  };

  const handleQuitClick = () => {
    dispatch(gameActions.pause());
    setShowQuitConfirm(true);
  };

  const handleQuitConfirm = () => {
    setShowQuitConfirm(false);
    dispatch(stop());
  };

  const handleQuitRejectClose = () => {
    setShowQuitConfirm(false);
    dispatch(gameActions.resume());
  };

  return (
    <Modal
      header="Pause"
      className={styles.PauseModal}
      onBackdropClick={props.onClose}
    >
      <Button onClick={props.onClose}>Resume</Button>
      <Button onClick={handleRestartClick}>Restart</Button>
      <Button onClick={handleQuitClick}>Quit</Button>

      {showRestartConfirm && (
        <ConfirmModal
          text="Do you really want to restart the game?"
          onConfirm={handleRestartConfirm}
          onReject={handleRestartRejectClose}
          onClose={handleRestartRejectClose}
        />
      )}

      {showQuitConfirm && (
        <ConfirmModal
          text="Do you really want to quit the game?"
          onConfirm={handleQuitConfirm}
          onReject={handleQuitRejectClose}
          onClose={handleQuitRejectClose}
        />
      )}
    </Modal>
  );
}

export default PauseModal;
