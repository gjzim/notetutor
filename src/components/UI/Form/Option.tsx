import styles from "./Option.module.css";

function Option({ id, label, children }: OptionPropsType) {
    return (
        <div className={`${styles.Option} ${id} clearfix`}>
            <div className={styles.OptionLabel}>
                <label htmlFor={id}>{label}:</label>
            </div>
            <div className={styles.OptionField}>{children}</div>
        </div>
    );
}

export type OptionPropsType = {
    id: string;
    label: string;
    children: React.ReactElement | React.ReactElement[];
};

export default Option;
