import styles from "./Backdrop.module.css";

function Backdrop(props) {
  let classes = [styles.Backdrop];
  if (props.high) {
    classes.push(styles.High);
  }

  return <div className={classes.join(" ")} onClick={props.onClick}></div>;
}

export default Backdrop;
