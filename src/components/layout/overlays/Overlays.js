import classes from "./Overlays.module.css";
import MenuModal from "./MenuModal";

function Overlays(props) {
  return (
    <div className={classes.Overlays}>
      <MenuModal />
    </div>
  );
}

export default Overlays;