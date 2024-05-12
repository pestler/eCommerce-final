import React, {FC, forwardRef, useState} from 'react';
import { FieldError } from 'react-hook-form';
import styles from './input.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";

type InputProps = React.HTMLProps<HTMLInputElement> & {
  error: FieldError | undefined;
};

const Input: FC<InputProps> = forwardRef(
  ({ label, error, ...props }, ref) => {
    const [typeInput, setTypeInput] = useState(props.type);

    const checkedType = () => {
      return typeInput === 'password'
        ? setTypeInput('text')
        : setTypeInput('password');
    };

    return (
      <div className={styles.formField}>
        <label className={styles.label}>
          {label}
          <input
            className={`${styles.input} ${error ? styles.errorInput : ''}`}
            ref={ref}
            {...props}
              type={typeInput}
          />
          {props.name === 'password' && (
            <div className={styles.eyeIcon} onClick={checkedType}>
              {typeInput === 'password' ? (
                <FontAwesomeIcon icon={fas.faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={fas.faEye} />
              )}
            </div>
          )}
        </label>
        {error && <span className={styles.error}>{error.message}</span>}
      </div>
    );
  },
);

export default Input;
