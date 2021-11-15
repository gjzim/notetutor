import Button from "../../UI/Button";
import Modal from "../../UI/Modal/Modal";
import styles from "./ConfirmModal.module.css";

function ConfirmModal(props) {
  return (
    <Modal className={styles.ConfirmModal} high>
      <p>{props.text}</p>
      <Button type="small">Yes</Button>
      <Button type="small">No</Button>
    </Modal>
  );
}

export default ConfirmModal;
