import classes from "./Choice.module.css";

function Choice(props) {
  return <li className={classes.Choice}>{props.note}</li>;
}

export default Choice;
