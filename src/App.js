import classes from "./App.module.css";
// import Startup from "./components/screens/Startup";
import Game from "./components/screens/Game";

function App() {
  return (
    <div className={classes.App}>
      <main>
        {/* <Startup /> */}
        <Game />
      </main>
    </div>
  );
}

export default App;
