import Button from "../../UI/Button";
import Modal from "../../UI/Modal/Modal";
import classes from "./PauseModal.module.css";

function PauseModal(props) {
  return (
    <Modal header="Pause" className={classes.PauseModal}>
      <Button>Resume</Button>
      <Button>Restart</Button>
      <Button>Quit</Button>
    </Modal>
  );
}

export default PauseModal;
