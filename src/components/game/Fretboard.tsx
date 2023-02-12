import { STRING_FRET_POSITIONS } from "../../constants/guitar";
import styles from "./Fretboard.module.css";

function Fretboard({ string, fret }: { string: number; fret: number }) {
    const style = {
        top: `${STRING_FRET_POSITIONS[string][fret][0]}px`,
        left: `${STRING_FRET_POSITIONS[string][fret][1]}px`,
    };
    return (
        <div className={styles.Fretboard}>
            <span id={styles.quesIcon} style={style}>
                ?
            </span>
        </div>
    );
}

export default Fretboard;
