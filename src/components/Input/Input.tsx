import React, {FC, forwardRef} from "react";
import styles from './input.module.scss';
import {FieldError} from "react-hook-form";

type InputProps = React.HTMLProps<HTMLInputElement> & {
    error: FieldError | undefined;
}

const Input: FC<InputProps> = forwardRef(({ label, error, ...props }, ref) => {
    return (
        <div className={styles.formField}>
            <label className={styles.label}>
                {label}
                <input className={styles.input} ref={ref} {...props} />
            </label>
            {error && <span className={styles.error}>{error.message}</span>}
        </div>
    );
});

export default Input;
