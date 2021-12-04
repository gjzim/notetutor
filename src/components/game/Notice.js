import styles from "./Notice.module.css";

function Notice(props) {
  const classes = [styles.Notice, props.className];

  return (
    <div className={styles.NoticeWrapper}>
      <div className={classes.join(" ")}>{props.children}</div>
    </div>
  );
}

export default Notice;
