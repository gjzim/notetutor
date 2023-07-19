import { useEffect, useRef, useState } from "react";
import TIMINGS from "../../constants/timings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./Choice.module.css";

function Choice({ note, answer, onClick }: { note: string; answer: string; onClick: (result: string) => void }) {
    const [status, setStatus] = useState<"active" | "correct" | "wrong">("active");
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

    let classes = [];
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
        <li className={styles.Choice}>
            <button className={classes.join(" ")} onClick={handleClick} disabled={status !== "active"}>
                {btnText}
            </button>
        </li>
    );
}

export default Choice;
