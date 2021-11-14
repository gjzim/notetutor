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
        <div>          
          <Button>Save</Button>
          <Button>Close</Button>
        </div>
      </ModalControls>
    </Modal>
  );
}

export default MenuModal;
