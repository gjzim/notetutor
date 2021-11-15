import Button from "../../UI/Button";
import Modal from "../../UI/Modal/Modal";
import styles from "./InfoModal.module.css";

function InfoModal(props) {
  return (
    <Modal className={styles.InfoModal} high>
      <p>{props.text}</p>
      <Button type="small">Close</Button>
    </Modal>
  );
}

export default InfoModal;
