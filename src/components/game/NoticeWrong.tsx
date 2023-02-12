import Notice from "./Notice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./NoticeWrong.module.css";

function NoticeWrong({ answer }: { answer: string }) {
    return (
        <Notice className={styles.NoticeWrong}>
            <>
                <div className={styles.WrongText}>
                    <FontAwesomeIcon icon={faTimes} />
                    &nbsp;Wrong!
                </div>
                <div className={styles.AnsText}>
                    Correct Note:
                    <span className={styles.CorrectNote}>{answer}</span>
                </div>
            </>
        </Notice>
    );
}

export default NoticeWrong;
