import { useEffect, useRef, useState } from "react";
import TIMINGS from "../../constants/timings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./Choice.module.css";

function Choice({ note, answer, onClick }: { note: string; answer: string; onClick: (result: string) => void }) {
    const [btnStatus, setBtnStatus] = useState<"active" | "correct" | "wrong">("active");
    const timeOutHandlerRef = useRef<undefined | ReturnType<typeof setTimeout>>();
    const status = note === answer ? "correct" : "wrong";

    useEffect(() => {
        return () => clearTimeout(timeOutHandlerRef.current);
    }, []);

    const handleClick = () => {
        setBtnStatus(status);
        onClick(status);

        timeOutHandlerRef.current = setTimeout(() => {
            setBtnStatus("active");
        }, TIMINGS.SHOW_ANSWER);
    };

    let classes = [];
    if (btnStatus !== "active") {
        classes.push(styles[btnStatus]);
    }

    let btnText: string | React.ReactElement = note;
    if (btnStatus === "correct") {
        btnText = <FontAwesomeIcon icon={faCheck} />;
    } else if (btnStatus === "wrong") {
        btnText = <FontAwesomeIcon icon={faTimes} />;
    }

    return (
        <li className={styles.Choice} data-cy="choice">
            <button
                className={classes.join(" ")}
                onClick={handleClick}
                disabled={btnStatus !== "active"}
                data-cy={window.Cypress ? `${status}-choice-btn` : "choice-btn"}
            >
                {btnText}
            </button>
        </li>
    );
}

export default Choice;
