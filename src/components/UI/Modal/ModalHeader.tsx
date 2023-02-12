import styles from "./ModalHeader.module.css";

function ModalHeader({ children }: { children: string | React.ReactElement }) {
    return (
        <div className={styles.ModalHeader}>
            <h3>{children}</h3>
        </div>
    );
}

export default ModalHeader;
