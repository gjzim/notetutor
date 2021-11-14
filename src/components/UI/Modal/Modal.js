import styles from "./Modal.module.css";
import Backdrop from "./Backdrop";
import ModalHeader from "./ModalHeader";
import ModalBody from "./ModalBody";

function Modal(props) {
  return (
    <>
      <div className={`${styles.Modal} ${props.className}`}>
        {props.header && <ModalHeader>{props.header}</ModalHeader>}

        <div className={styles.ModalContent}>
          <ModalBody>
            {props.children}
          </ModalBody>
        </div>
      </div>
      <Backdrop />
    </>
  );
}

export default Modal;
