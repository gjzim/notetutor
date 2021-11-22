import Button from "../../UI/Button";
import Modal from "../../UI/Modal/Modal";
import styles from "./ConfirmModal.module.css";

function ConfirmModal(props) {
  return (
    <Modal className={styles.ConfirmModal} onBackdropClick={props.onClose} high>
      <p>{props.text}</p>
      <Button type="small" onClick={props.onConfirm}>
        Yes
      </Button>
      <Button type="small" onClick={props.onReject}>
        No
      </Button>
    </Modal>
  );
}

export default ConfirmModal;
