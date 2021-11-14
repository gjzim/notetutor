import Button from "../../UI/Button";
import Modal from "../../UI/Modal/Modal";
import styles from "./PauseModal.module.css";

function PauseModal(props) {
  return (
    <Modal header="Pause" className={styles.PauseModal}>
      <Button>Resume</Button>
      <Button>Restart</Button>
      <Button>Quit</Button>
    </Modal>
  );
}

export default PauseModal;
