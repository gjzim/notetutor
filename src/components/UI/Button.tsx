import styles from "./Button.module.css";

function Button({ type, children, onClick, ...otherProps }: { type?: string; children: string; onClick: () => void }) {
    let classes = [styles.Button];
    if (type === "small") {
        classes.push(styles.Small);
    }

    return (
        <button className={classes.join(" ")} onClick={onClick} {...otherProps}>
            {children}
        </button>
    );
}

export default Button;
