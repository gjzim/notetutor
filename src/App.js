import { useSelector } from "react-redux";
import Startup from "./components/screens/Startup";
import Game from "./components/screens/Game";
import End from "./components/screens/End";

function App() {
  const currentScreen = useSelector((state) => state.ui.currentScreen);
  return (
    <>
      {currentScreen === "start" && <Startup />}
      {currentScreen === "game" && <Game />}
      {currentScreen === "end" && <End />}
    </>
  );
}

export default App;
