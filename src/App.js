import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { optionsActions } from "./store/options-slice";

import Startup from "./components/screens/Startup";
import Game from "./components/screens/Game";
import End from "./components/screens/End";

function App() {
  const currentScreen = useSelector((state) => state.ui.currentScreen);
  const dispatch = useDispatch();

  useEffect(() => {
    let savedOptions = window.localStorage.getItem("nt-game-options");
    if (savedOptions) {
      savedOptions = JSON.parse(savedOptions);
      dispatch(optionsActions.updateOptions(savedOptions));
    }
  }, [dispatch]);

  return (
    <>
      {currentScreen === "start" && <Startup />}
      {currentScreen === "game" && <Game />}
      {currentScreen === "end" && <End />}
    </>
  );
}

export default App;
