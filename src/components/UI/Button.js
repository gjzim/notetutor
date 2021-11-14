import styles from "./Button.module.css";

function Button(props) {
  const selectedstyles = [styles.Button];
  if (props.type === "small") {
    selectedstyles.push(styles.Small);
  }

  return <button className={selectedstyles.join(' ')}>{props.children}</button>;
}

export default Button;
