import Button from "../../UI/Button";
import Modal from "../../UI/Modal/Modal";
import ModalControls from "../../UI/Modal/ModalControls";
import MenuOptions from "./MenuOptions";
import classes from "./MenuModal.module.css";

function MenuModal(props) {
  return (
    <Modal header="Menu" className={classes.MenuModal}>
      <MenuOptions />
      <ModalControls>
        <Button>Defaults</Button>        
        <Button>Close</Button>
        <Button>Save</Button>
      </ModalControls>
    </Modal>
  );
}

export default MenuModal;
