import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import Backdrop from "./Backdrop";
import ModalHeader from "./ModalHeader";
import ModalBody from "./ModalBody";

function Modal({ className = "", header = "", children, high = false, onBackdropClick }: ModalPropsType) {
    return ReactDOM.createPortal(
        <>
            <div className={`${classes.Modal} ${className}`}>
                {header && <ModalHeader>{header}</ModalHeader>}

                <div className={classes.ModalContent}>
                    <ModalBody>{children}</ModalBody>
                </div>
            </div>
            <Backdrop high={high} onClick={onBackdropClick} />
        </>,
        document.getElementById("overlays")!
    );
}

export type ModalPropsType = {
    children: React.ReactElement;
    onBackdropClick: () => void;
    className?: string;
    high?: boolean;
    header?: string | React.ReactElement;
};

export default Modal;
