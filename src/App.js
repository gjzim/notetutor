import styles from "./App.module.css";
import { useSelector } from "react-redux";
import Startup from "./components/screens/Startup";
import Game from "./components/screens/Game";
import End from "./components/screens/End";
import Overlays from "./components/layout/overlays/Overlays";

function App() {
  const currentScreen = useSelector((state) => state.ui.currentScreen);
  return (
    <div className={styles.App}>
      <main>
        {currentScreen === "start" && <Startup />}
        {currentScreen === "game" && <Game />}
        {currentScreen === "end" && <End />}
        <Overlays />
      </main>
    </div>
  );
}

export default App;
