import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { gameActions } from "../../store/game-slice";
import { formatClockTime } from "../../util";
import styles from "./Clock.module.css";

function Clock(props) {
  const isPlaying = useSelector((state) => state.game.playing);
  const time = useSelector((state) => state.game.instance.time);
  const dispatch = useDispatch();

  useEffect(() => {
    let interval = null;

    if (isPlaying) {
      interval = setInterval(() => {
        dispatch(gameActions.timeAddSecond());
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlaying, dispatch]);

  return <div className={styles.Clock}>{formatClockTime(time)}</div>;
}

export default Clock;
