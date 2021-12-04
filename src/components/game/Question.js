import styles from "./Question.module.css";
import Choice from "./Choice";

function Question(props) {
  return (
    <div className={styles.Question}>
      <h2 className={styles.title}>
        Q<span id={styles.serial}>{props.serial}</span>: Select the right note{" "}
      </h2>
      <ul className={styles.choices}>
        {props.options.map((note, index) => (
          <Choice
            key={index}
            note={note}
            onClick={props.onChoiceClick}
          />
        ))}
      </ul>
    </div>
  );
}

export default Question;
