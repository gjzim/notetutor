import largeLogoImg from "../../assets/logo-large.png";
import styles from "./LogoLarge.module.css";

function LogoLarge() {
    return (
        <div className={styles.LogoLarge}>
            <img src={largeLogoImg} alt="Notetutor logo large" data-cy="notetutor-logo-large" />
        </div>
    );
}

export default LogoLarge;
