import { useEffect } from "react";
import { optionsActions } from "./store/options-slice";
import Startup from "./components/screens/Startup";
import Game from "./components/screens/Game";
import End from "./components/screens/End";
import { useAppDispatch, useAppSelector } from "./hooks/redux";

function App() {
    const currentScreen = useAppSelector((state) => state.ui.currentScreen);
    const dispatch = useAppDispatch();

    useEffect(() => {
        let savedOptions = window.localStorage.getItem("nt-game-options");
        if (savedOptions && dispatch) {
            savedOptions = JSON.parse(savedOptions);
            dispatch(optionsActions.updateOptions(savedOptions as any));
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
