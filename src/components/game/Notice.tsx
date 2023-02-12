import styles from "./Notice.module.css";

function Notice({ className, children }: { className: string; children: React.ReactElement }) {
    const classes = [styles.Notice, className];

    return (
        <div className={styles.NoticeWrapper}>
            <div className={classes.join(" ")}>{children}</div>
        </div>
    );
}

export default Notice;
