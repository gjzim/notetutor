import logoImg from "../../assets/logo.png";
import classes from "./Logo.module.css";

function Logo(props) {
  return (
    <div className={classes.Logo}>
        <img src={logoImg} alt="Notetutor logo" />
    </div>
  );
}

export default Logo;