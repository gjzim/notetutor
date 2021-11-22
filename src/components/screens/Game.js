import styles from "./Game.module.css";
import Logo from "../UI/Logo";
import Fretboard from "../game/Fretboard";
import Question from "../game/Question";
import Clock from "../game/Clock";

function Game(props) {
  return (
    <div className={styles.Game}>
      <Logo />
      <Fretboard />
      <Question />
      <Clock />
    </div>
  );
}

export default Game;
