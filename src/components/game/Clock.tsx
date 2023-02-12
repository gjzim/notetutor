import { useEffect } from "react";
import { gameActions } from "../../store/game-slice";
import { formatClockTime } from "../../util";
import styles from "./Clock.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

function Clock() {
    const isPlaying = useAppSelector((state) => state.game.playing);
    const time = useAppSelector((state) => state.game.time);
    const dispatch = useAppDispatch();

    useEffect(() => {
        let interval: undefined | ReturnType<typeof setInterval> = undefined;

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
