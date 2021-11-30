import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { gameActions } from "./store/game-slice";
import { gameDefaultOptions } from "./store/game-default-options";

import Startup from "./components/screens/Startup";
import Game from "./components/screens/Game";
import End from "./components/screens/End";

function App() {  
  const currentScreen = useSelector((state) => state.ui.currentScreen);
  const dispatch = useDispatch();

  useEffect(() => {
    let gameOptions = window.localStorage.getItem("nt-game-options");
    if (gameOptions) {
      gameOptions = JSON.parse(gameOptions);

      dispatch(
        gameActions.setOptions({
          totalQues: gameOptions.totalQues || gameDefaultOptions.totalQues,
          strings: gameOptions.strings || gameDefaultOptions.strings,
          frets: gameOptions.frets || gameDefaultOptions.frets,
        })
      );
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
