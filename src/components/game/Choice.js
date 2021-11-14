import styles from "./Choice.module.css";

function Choice(props) {
  return <li className={styles.Choice}>{props.note}</li>;
}

export default Choice;
