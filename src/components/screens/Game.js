import { useState } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice.js";

import styles from "./Game.module.css";
import Logo from "../UI/Logo";
import Fretboard from "../game/Fretboard";
import Question from "../game/Question";
import Button from "../UI/Button";
import Clock from "../game/Clock";
import MenuModal from "../layout/overlays/MenuModal";
import PauseModal from "../layout/overlays/PauseModal";
import ConfirmModal from "../layout/overlays/ConfirmModal";

function Game(props) {
  const [showMenu, setShowMenu] = useState(false);
  const [showPause, setShowPause] = useState(false);
  const [showRestartConfirm, setShowRestartConfirm] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className={styles.Game}>
      <Logo />
      <Fretboard />
      <Question />
      <div className={styles.Controls}>
        <Button onClick={() => setShowMenu(true)}>Menu</Button>
        <Button onClick={() => setShowRestartConfirm(true)}>Restart</Button>
        <Button onClick={() => setShowPause(true)}>Pause</Button>
      </div>
      <Clock />

      {showMenu && <MenuModal onClose={() => setShowMenu(false)} />}
      {showPause && <PauseModal onClose={() => setShowPause(false)} />}
      {showRestartConfirm && (
        <ConfirmModal
          text="Do you really want to restart the game?"
          onReject={() => setShowRestartConfirm(false)}
          onClose={() => setShowRestartConfirm(false)}
        />
      )}
    </div>
  );
}

export default Game;
