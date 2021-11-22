import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice.js";

import styles from "./End.module.css";
import Logo from "../UI/Logo";
import Footer from "../layout/Footer";
import Button from "../UI/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

function End(props) {
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
            <p>Score: 20/25</p>
            <p>Time: 00:00</p>
          </div>
        </div>

        <hr className={styles.Divider}></hr>

        <div className={styles.Controls}>
          <Button onClick={() => dispatch(uiActions.changeScreen("game"))}>Play Again</Button>
          <Button onClick={() => dispatch(uiActions.changeScreen("start"))}>Go Back</Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default End;
