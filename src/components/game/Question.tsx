import styles from "./Question.module.css";
import Choice from "./Choice";
import { useAppSelector } from "../../hooks/redux";

function Question({
    serial,
    options,
    onChoiceClick,
}: {
    serial: number;
    options: string[];
    onChoiceClick: (result: string) => void;
}) {
    const answer = useAppSelector((state) => (state.game.quiz ? state.game.quiz.current.answer! : ""));

    return (
        <div className={styles.Question}>
            <h2 className={styles.title}>
                Q<span id={styles.serial}>{serial}</span>: Select the right note
            </h2>
            <ul className={styles.choices}>
                {options.map((note, index) => (
                    <Choice key={index} note={note} answer={answer} onClick={onChoiceClick} />
                ))}
            </ul>
        </div>
    );
}

export default Question;
