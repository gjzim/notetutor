import styles from "./Option.module.css";

function Option(props) {
  return (
    <div className={`${styles.Option} ${props.id} clearfix`}>
      <div className={styles.OptionLabel}>
        <label htmlFor={props.id}>{props.label}:</label>
      </div>
      <div className={styles.OptionField}>{props.children}</div>
    </div>
  );
}

export default Option;
