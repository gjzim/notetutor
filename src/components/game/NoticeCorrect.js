import Notice from "./Notice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import styles from "./NoticeCorrect.module.css";

function NoticeCorrect(props) {
  return (
    <Notice className={styles.NoticeCorrect}>
      <FontAwesomeIcon icon={faCheck} />
      &nbsp;Correct
    </Notice>
  );
}

export default NoticeCorrect;
