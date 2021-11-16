import styles from "./Button.module.css";

function Button(props) {
  let classes = [styles.Button];
  if (props.type === "small") {
    classes.push(styles.Small);
  }

  return (
    <button className={classes.join(" ")} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
