import classes from "./Startup.module.css";
import LogoLarge from "../UI/LogoLarge";
import Button from "../UI/Button";
import Footer from "../layout/Footer";

function Startup(props) {
  return (
    <div className={classes.Startup}>
      <LogoLarge />
      <h2 className={classes.slogan}>Master Your Fretboard</h2>
      <div className={classes.controls}>
        <Button>Start Playing</Button>
        <Button>Customize</Button>
      </div>
      <Footer />
    </div>
  );
}

export default Startup;
