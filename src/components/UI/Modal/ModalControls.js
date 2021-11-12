import classes from "./ModalControls.module.css";

function ModalControls(props) {
  return (
    <div className={classes.ModalControls}>
        {props.children}
    </div>
  );
}

export default ModalControls;