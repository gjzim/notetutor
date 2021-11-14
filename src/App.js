import styles from "./App.module.css";
// import Startup from "./components/screens/Startup";
import Game from "./components/screens/Game";
import Overlays from "./components/layout/overlays/Overlays";

function App() {
  return (
    <div className={styles.App}>
      <main>
        {/* <Startup /> */}
        <Game />
        <Overlays />
      </main>
    </div>
  );
}

export default App;
