import { useState } from "react";
import { useDispatch } from "react-redux";
import { start } from "../../store/game-actions.js";

import styles from "./Startup.module.css";
import LogoLarge from "../UI/LogoLarge";
import Button from "../UI/Button";
import Footer from "../layout/Footer";
import MenuModal from "../layout/overlays/MenuModal";

function Startup(props) {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className={styles.Startup}>
      <LogoLarge />
      <h2 className={styles.slogan}>Master Your Fretboard</h2>
      <div className={styles.controls}>
        <Button onClick={() => dispatch(start())}>
          Start Playing
        </Button>
        <Button onClick={() => setShowMenu(true)}>Customize</Button>
      </div>
      <Footer />
      {showMenu && <MenuModal onClose={() => setShowMenu(false)} />}
    </div>
  );
}

export default Startup;
