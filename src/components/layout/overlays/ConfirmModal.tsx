import Button from "../../UI/Button";
import Modal from "../../UI/Modal/Modal";
import styles from "./ConfirmModal.module.css";

function ConfirmModal({ text, onClose, onConfirm, onReject }: ConfirmModalPropsType) {
    return (
        <Modal className={styles.ConfirmModal} onBackdropClick={onClose} high>
            <>
                <p>{text}</p>
                <Button type="small" onClick={onConfirm}>
                    Yes
                </Button>
                <Button type="small" onClick={onReject}>
                    No
                </Button>
            </>
        </Modal>
    );
}

export type ConfirmModalPropsType = {
    text: string;
    onClose: () => void;
    onConfirm: () => void;
    onReject: () => void;
};

export default ConfirmModal;
