import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import Backdrop from "./Backdrop";
import ModalHeader from "./ModalHeader";
import ModalBody from "./ModalBody";

function Modal(props) {
  return ReactDOM.createPortal(
    <>
      <div className={`${classes.Modal} ${props.className}`}>
        {props.header && <ModalHeader>{props.header}</ModalHeader>}

        <div className={classes.ModalContent}>
          <ModalBody>{props.children}</ModalBody>
        </div>
      </div>
      <Backdrop high={props.high} onClick={props.onBackdropClick}/>
    </>,
    document.getElementById("overlays")
  );
}

export default Modal;
