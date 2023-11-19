import { useState } from "react";
import { start, stop } from "../../../store/game-actions";
import { gameActions } from "../../../store/game-slice";
import Button from "../../UI/Button";
import Modal from "../../UI/Modal/Modal";
import styles from "./PauseModal.module.css";
import ConfirmModal from "./ConfirmModal";
import { useAppDispatch } from "../../../hooks/redux";

function PauseModal({ onClose }: { onClose: () => void }) {
    const [showRestartConfirm, setShowRestartConfirm] = useState(false);
    const [showQuitConfirm, setShowQuitConfirm] = useState(false);
    const dispatch = useAppDispatch();

    const handleRestartClick = () => {
        dispatch(gameActions.pause());
        setShowRestartConfirm(true);
    };

    const handleRestartConfirm = () => {
        setShowRestartConfirm(false);
        onClose();
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
        <Modal header="Pause" className={styles.PauseModal} onBackdropClick={onClose}>
            <>
                <Button onClick={onClose} data-cy="pm-resume-btn">
                    Resume
                </Button>
                <Button onClick={handleRestartClick} data-cy="pm-restart-btn">
                    Restart
                </Button>
                <Button onClick={handleQuitClick} data-cy="pm-quit-btn">
                    Quit
                </Button>

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
            </>
        </Modal>
    );
}

export default PauseModal;
