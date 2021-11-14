import largeLogoImg from "../../assets/logo-large.png";
import styles from "./LogoLarge.module.css";

function LogoLarge(props) {
  return (
    <div className={styles.LogoLarge}>
        <img src={largeLogoImg} alt="Notetutor logo large" />
    </div>
  );
}

export default LogoLarge;