import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import TIMINGS from "../../constants/timings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./Choice.module.css";

function Choice(props) {
  const [status, setStatus] = useState("active");
  const answer = useSelector((state) => state.game.quiz.current.answer);
  const timeOutHandlerRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timeOutHandlerRef.current);
  }, []);

  const handleClick = () => {
    if (props.note === answer) {
      setStatus("correct");
      props.onClick("correct");
    } else {
      setStatus("wrong");
      props.onClick("wrong");
    }

    timeOutHandlerRef.current = setTimeout(() => {
      setStatus("active");
    }, TIMINGS.SHOW_ANSWER);
  };

  let classes = [styles.Choice];
  if (status !== "active") {
    classes.push(styles[status]);
  }

  let btnText = props.note;
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
