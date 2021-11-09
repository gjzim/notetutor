import classes from "./Question.module.css";
import Choice from "./Choice";

function Question(props) {
  return (
    <div className={classes.Question}>
      <h2 className={classes.title}>
        Q<span id={classes.serial}>0</span>: Select the right note{" "}
      </h2>
      <ul className={classes.choices}>
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
