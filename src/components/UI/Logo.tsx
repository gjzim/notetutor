import logoImg from "../../assets/logo.png";
import styles from "./Logo.module.css";

function Logo() {
    return (
        <div className={styles.Logo}>
            <img src={logoImg} alt="Notetutor logo" data-cy="notetutor-logo" />
        </div>
    );
}

export default Logo;
