import classes from "./ModalBody.module.css";

function ModalBody(props) {
  return (
    <div className={classes.ModalBody}>
        {props.children}
    </div>
  );
}

export default ModalBody;