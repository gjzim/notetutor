import styles from "./Backdrop.module.css";

function Backdrop({ onClick, high = false }: { onClick: () => void; high?: boolean }) {
    let classes = [styles.Backdrop];
    if (high) {
        classes.push(styles.High);
    }

    return <div className={classes.join(" ")} onClick={onClick}></div>;
}

export default Backdrop;
