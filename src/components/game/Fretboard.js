import classes from "./Fretboard.module.css";

function Fretboard(props) {
  return (
    <div className={classes.Fretboard}>
      <span id={classes.quesIcon}>?</span>
    </div>
  );
}

export default Fretboard;