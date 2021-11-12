import classes from "./ModalHeader.module.css";

function ModalHeader(props) {
  return (
    <div className={classes.ModalHeader}>
        <h3>{props.children}</h3>
    </div>
  );
}

export default ModalHeader;