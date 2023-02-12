import { useEffect, useRef, useState } from "react";
import TIMINGS from "../../constants/timings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./Choice.module.css";
import { useAppSelector } from "../../hooks/redux";

function Choice({ note, onClick }: { note: string; onClick: (result: string) => void }) {
    const [status, setStatus] = useState("active");
    const answer = useAppSelector((state) => (state.game.quiz ? state.game.quiz.current.answer : ""));
    const timeOutHandlerRef = useRef<undefined | ReturnType<typeof setTimeout>>();

    useEffect(() => {
        return () => clearTimeout(timeOutHandlerRef.current);
    }, []);

    const handleClick = () => {
        if (note === answer) {
            setStatus("correct");
            onClick("correct");
        } else {
            setStatus("wrong");
            onClick("wrong");
        }

        timeOutHandlerRef.current = setTimeout(() => {
            setStatus("active");
        }, TIMINGS.SHOW_ANSWER);
    };

    let classes = [styles.Choice];
    if (status !== "active") {
        classes.push(styles[status]);
    }

    let btnText: string | React.ReactElement = note;
    if (status === "correct") {
        btnText = <FontAwesomeIcon icon={faCheck} />;
    } else if (status === "wrong") {
        btnText = <FontAwesomeIcon icon={faTimes} />;
    }

    return (
        <li className={classes.join(" ")} onClick={handleClick}>
            {btnText}
        </li>
    );
}

export default Choice;
