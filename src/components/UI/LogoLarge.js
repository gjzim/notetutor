import largeLogoImg from "../../assets/logo-large.png";
import classes from "./LogoLarge.module.css";

function LogoLarge(props) {
  return (
    <div className={classes.LogoLarge}>
        <img src={largeLogoImg} alt="Notetutor logo large" />
    </div>
  );
}

export default LogoLarge;