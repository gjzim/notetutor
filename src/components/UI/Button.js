import classes from "./Button.module.css";

function Button(props) {
  return (
    <button className={classes.Button}>{props.children}</button>
  );
}

export default Button;