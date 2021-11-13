import classes from "./Option.module.css";

function Option(props) {
  return (
    <div className={`${classes.Option} ${props.id} clearfix`}>
      <div className={classes.OptionLabel}>
        <label htmlFor={props.id}>{props.label}:</label>
      </div>
      <div className={classes.OptionField}>{props.children}</div>
    </div>
  );
}

export default Option;
