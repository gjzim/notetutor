import classes from "./Game.module.css";
import Logo from "../UI/Logo";
import Fretboard from "../game/Fretboard";
import Question from "../game/Question";
import Controls from "../game/Controls";
import Clock from "../game/Clock";

function Game(props) {
  return (
    <div className={classes.Game}>
      <Logo />
      <Fretboard />
      <Question />
      <Controls />
      <Clock />
    </div>
  );
}

export default Game;
