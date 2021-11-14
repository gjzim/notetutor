import styles from "./ModalBody.module.css";

function ModalBody(props) {
  return (
    <div className={styles.ModalBody}>
        {props.children}
    </div>
  );
}

export default ModalBody;