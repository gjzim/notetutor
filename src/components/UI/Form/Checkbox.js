import classes from "./Checkbox.module.css";

function Checkbox(props) {
  return (
    <div className={`${classes.Checkbox} ${props.className}`}>
      <input type="checkbox" id={props.id} name={props.name} value={props.value} />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
}

export default Checkbox;
