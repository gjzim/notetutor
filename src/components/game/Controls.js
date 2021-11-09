import classes from "./Controls.module.css";
import Button from "./../UI/Button";

function Controls(props) {
  return (
    <div className={classes.Controls}>
      <Button>Menu</Button>
      <Button>Restart</Button>
      <Button>Pause</Button>
    </div>
  );
}

export default Controls;
