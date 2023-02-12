import styles from "./ModalControls.module.css";

function ModalControls({ children }: { children: React.ReactElement[] }) {
    return <div className={styles.ModalControls}>{children}</div>;
}

export default ModalControls;
