import Button from "../../UI/Button";
import Modal from "../../UI/Modal/Modal";
import styles from "./InfoModal.module.css";

function InfoModal(props) {
  return (
    <Modal className={styles.InfoModal} onBackdropClick={props.onClose} high>
      <p>{props.text}</p>
      <Button type="small" onClick={props.onClose}>
        Close
      </Button>
    </Modal>
  );
}

export default InfoModal;
