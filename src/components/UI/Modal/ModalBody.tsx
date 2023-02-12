import styles from "./ModalBody.module.css";

function ModalBody({ children }: { children: React.ReactElement }) {
    return <div className={styles.ModalBody}>{children}</div>;
}

export default ModalBody;
