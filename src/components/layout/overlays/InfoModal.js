import { useEffect } from "react";
import Button from "../../UI/Button";
import Modal from "../../UI/Modal/Modal";
import styles from "./InfoModal.module.css";

function InfoModal({ text, onClose }) {
  useEffect(() => {
    setTimeout(onClose, 2000);
  }, [onClose]);

  return (
    <Modal className={styles.InfoModal} onBackdropClick={onClose} high>
      <p>{text}</p>
      <Button type="small" onClick={onClose}>
        Close
      </Button>
    </Modal>
  );
}

export default InfoModal;
