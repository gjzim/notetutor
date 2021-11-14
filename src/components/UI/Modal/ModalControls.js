import styles from "./ModalControls.module.css";

function ModalControls(props) {
  return (
    <div className={styles.ModalControls}>
        {props.children}
    </div>
  );
}

export default ModalControls;