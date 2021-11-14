import styles from "./Fretboard.module.css";

function Fretboard(props) {
  return (
    <div className={styles.Fretboard}>
      <span id={styles.quesIcon}>?</span>
    </div>
  );
}

export default Fretboard;