import { useEffect } from "react";
import TIMINGS from "../../../constants/timings";
import Button from "../../UI/Button";
import Modal from "../../UI/Modal/Modal";
import styles from "./InfoModal.module.css";

function InfoModal({ text, onClose }: { text: string; onClose: () => void }) {
    useEffect(() => {
        let timeOutHandler = setTimeout(onClose, TIMINGS.MODAL_AUTOHIDE);
        return () => clearTimeout(timeOutHandler);
    }, [onClose]);

    return (
        <Modal className={styles.InfoModal} onBackdropClick={onClose} high>
            <>
                <p>{text}</p>
                <Button type="small" onClick={onClose}>
                    Close
                </Button>
            </>
        </Modal>
    );
}

export default InfoModal;
