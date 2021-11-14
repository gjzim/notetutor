import styles from "./Question.module.css";
import Choice from "./Choice";

function Question(props) {
  return (
    <div className={styles.Question}>
      <h2 className={styles.title}>
        Q<span id={styles.serial}>0</span>: Select the right note{" "}
      </h2>
      <ul className={styles.choices}>
        <Choice key="0" note="A" />
        <Choice key="1" note="B" />
        <Choice key="2" note="A#" />
        <Choice key="3" note="D" />
        <Choice key="4" note="F" />
      </ul>
    </div>
  );
}

export default Question;
