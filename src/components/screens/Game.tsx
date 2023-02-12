import { useEffect, useRef, useState } from "react";
import { advance, start } from "../../store/game-actions";
import { gameActions } from "../../store/game-slice";
import TIMINGS from "../../constants/timings";
import styles from "./Game.module.css";
import Logo from "../UI/Logo";
import NoticeCorrect from "../game/NoticeCorrect";
import NoticeWrong from "../game/NoticeWrong";
import Fretboard from "../game/Fretboard";
import Question from "../game/Question";
import Button from "../UI/Button";
import Clock from "../game/Clock";
import MenuModal from "../layout/overlays/MenuModal";
import PauseModal from "../layout/overlays/PauseModal";
import ConfirmModal from "../layout/overlays/ConfirmModal";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

function Game() {
    const [showMenu, setShowMenu] = useState(false);
    const [showPause, setShowPause] = useState(false);
    const [showRestart, setShowRestart] = useState(false);
    const [showCorrectNotice, setShowCorrectNotice] = useState(false);
    const [showWrongNotice, setShowWrongNotice] = useState(false);
    const timeOutHandlerRef = useRef<undefined | ReturnType<typeof setTimeout>>();

    const dispatch = useAppDispatch();
    const currentQuiz = useAppSelector((state) => {
        if (state.game.quiz) return state.game.quiz.current;
    });

    useEffect(() => {
        return () => clearTimeout(timeOutHandlerRef.current);
    }, []);

    const handleChoiceClick = (result: string) => {
        if (result === "correct") {
            setShowCorrectNotice(true);
        } else {
            setShowWrongNotice(true);
        }

        timeOutHandlerRef.current = setTimeout(() => {
            setShowCorrectNotice(false);
            setShowWrongNotice(false);
            dispatch(advance(result));
        }, TIMINGS.SHOW_ANSWER);
    };

    const handleMenuClick = () => {
        dispatch(gameActions.pause());
        setShowMenu(true);
    };

    const handleMenuClose = () => {
        dispatch(gameActions.resume());
        setShowMenu(false);
    };

    const handlePauseClick = () => {
        dispatch(gameActions.pause());
        setShowPause(true);
    };

    const handlePauseClose = () => {
        dispatch(gameActions.resume());
        setShowPause(false);
    };

    const handleRestartClick = () => {
        dispatch(gameActions.pause());
        setShowRestart(true);
    };

    const handleRestartConfirm = () => {
        dispatch(start());
        setShowRestart(false);
    };

    const handleRestartRejectClose = () => {
        dispatch(gameActions.resume());
        setShowRestart(false);
    };

    if (!currentQuiz) return null;

    return (
        <div className={styles.Game}>
            <Logo />
            {showCorrectNotice && <NoticeCorrect />}
            {showWrongNotice && <NoticeWrong answer={currentQuiz.answer ?? ""} />}

            <Fretboard string={currentQuiz.ques.string} fret={currentQuiz.ques.fret} />
            <Question
                serial={currentQuiz.serial}
                options={currentQuiz.options ?? []}
                onChoiceClick={handleChoiceClick}
            />
            <div className={styles.Controls}>
                <Button onClick={handleMenuClick}>Menu</Button>
                <Button onClick={handleRestartClick}>Restart</Button>
                <Button onClick={handlePauseClick}>Pause</Button>
            </div>
            <Clock />

            {showMenu && <MenuModal onClose={handleMenuClose} />}
            {showPause && <PauseModal onClose={handlePauseClose} />}
            {showRestart && (
                <ConfirmModal
                    text="Do you really want to restart the game?"
                    onConfirm={handleRestartConfirm}
                    onReject={handleRestartRejectClose}
                    onClose={handleRestartRejectClose}
                />
            )}
        </div>
    );
}

export default Game;
