import classes from "./App.module.css";
import Startup from "./components/screens/Startup";

function App() {
  return (
    <div className={classes.App}>
      <main>
        <Startup />
      </main>
    </div>
  );
}

export default App;
