import { uiActions } from "./ui-slice";
import { gameActions } from "./game-slice";
import { generateQuiz } from "../util";

export const start = () => {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(uiActions.changeScreen("game"));
    dispatch(
      gameActions.start({
        quiz: generateQuiz(state.options),
      })
    );
  };
};

export const advance = (result) => {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(gameActions.updateScore(result));
    
    if (state.game.quiz.current.serial >= state.options.totalQues) {
      dispatch(uiActions.changeScreen("end"));
      dispatch(gameActions.quit());
    } else {
      dispatch(
        gameActions.advance({
          quiz: generateQuiz(state.options, state.game.quiz.current),
        })
      );
    }
  };
};

export const stop = () => {
  return (dispatch) => {
    dispatch(gameActions.quit());
    dispatch(uiActions.changeScreen("start"));
  };
};
