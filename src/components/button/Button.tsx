import React, {ButtonHTMLAttributes, DetailedHTMLProps, useState} from 'react';
import styles from './button.module.scss';

type BtnProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  className: string | undefined;
};

const Button: React.FC<BtnProps> = ({ children, className, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`${styles.btn} ${styles[className!]}`}
      {...props}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && className === 'outline' ? 'Удалить' : children}
    </button>
  );
};

export default Button;
