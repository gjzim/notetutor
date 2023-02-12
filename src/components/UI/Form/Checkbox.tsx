import styles from "./Checkbox.module.css";

function Checkbox({ id, className, name, label, value, checked, onChange }: CheckboxPropsType) {
    return (
        <div className={`${styles.Checkbox} ${className}`}>
            <input type="checkbox" id={id} name={name} value={value} checked={checked} onChange={onChange} />
            <label htmlFor={id}>{label}</label>
        </div>
    );
}

export type CheckboxPropsType = {
    id: string;
    className: string;
    name: string;
    label: string;
    value: any;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default Checkbox;
