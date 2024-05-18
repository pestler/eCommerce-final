import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import styles from './button.module.scss';

type BtnProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  className: string | undefined;
};

const Button: React.FC<BtnProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`${styles.btn} ${className ? className : ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
