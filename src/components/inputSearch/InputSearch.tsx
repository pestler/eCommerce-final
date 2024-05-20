import React, { FC } from 'react';
import styles from './inputSearch.module.scss';

const InputSearch: FC<React.HTMLProps<HTMLInputElement>> = ({ ...props }) => {
  return (
    <div>
      <input className={styles.inputSearch} {...props} type="text" />
    </div>
  );
};

export default InputSearch;
