import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice.js";
import { start } from "../../store/game-actions";
import { formatClockTime } from "../../util.js";

import styles from "./End.module.css";
import Logo from "../UI/Logo";
import Footer from "../layout/Footer";
import Button from "../UI/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

function End(props) {
  const game = useSelector((state) => state.game);
  const totalQues = useSelector((state) => state.options.totalQues);
  const dispatch = useDispatch();

  return (
    <div className={styles.End}>
      <Logo />
      <div className={styles.MainWindow}>
        <div className={styles.ScoreSection}>
          <FontAwesomeIcon
            className={styles.TrophyIcon}
            icon={faTrophy}
            size="3x"
          />
          <div className={styles.ScoreText}>
            <p>Score: {`${game.score}/${totalQues}`}</p>
            <p>Time: {`${formatClockTime(game.time)}`}</p>
          </div>
        </div>

        <hr className={styles.Divider}></hr>

        <div className={styles.Controls}>
          <Button onClick={() => dispatch(start())}>
            Play Again
          </Button>
          <Button onClick={() => dispatch(uiActions.changeScreen("start"))}>
            Go Back
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default End;
