import Button from "../../UI/Button";
import Modal from "../../UI/Modal/Modal";
import ModalControls from "../../UI/Modal/ModalControls";
import MenuOptions from "./MenuOptions";
import styles from "./MenuModal.module.css";

function MenuModal(props) {
  return (
    <Modal header="Menu" className={styles.MenuModal} onBackdropClick={props.onClose}>
      <MenuOptions />
      <ModalControls>
        <Button type="small">Defaults</Button>
        <div>
          <Button type="small">Save</Button>
          <Button type="small" onClick={props.onClose}>
            Close
          </Button>
        </div>
      </ModalControls>
    </Modal>
  );
}

export default MenuModal;
