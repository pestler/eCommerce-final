import React, {forwardRef} from 'react';
import styles from './selectCustom.module.scss';
import {FieldError} from "react-hook-form";

type InputProps = React.HTMLProps<HTMLSelectElement> & {
    error: FieldError | undefined;
    options: { value: string | number, title: string | number }[],
};

const SelectCustom = forwardRef<HTMLSelectElement, InputProps>(({ error, options, ...props }, ref) => {
    return (
        <>
            <select className={styles.select} ref={ref} {...props}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.title}</option>
                ))}
            </select>
            {error && <span className={styles.error}>{error.message}</span>}
        </>
    );
});

export default SelectCustom;
