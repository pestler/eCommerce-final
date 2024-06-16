import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  useState,
} from 'react';
import styles from './button.module.scss';

type BtnProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  className: string | undefined;
  alternativeText?: string;
};

const CustomButton: React.FC<BtnProps> = ({
  children,
  className,
  alternativeText,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`${styles.btn} ${styles[className!]}`}
      {...props}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && className === 'outline' ? alternativeText! : children}
    </button>
  );
};

export default CustomButton;
