import React, {FC, useState} from 'react';
import styles from './inputSearch.module.scss';

import Image from '../../assets/images/humidity.png'
import {ProductProjectionInterface} from "../../interface/productProjection.interface.ts";

const InputSearch: FC<React.HTMLProps<HTMLInputElement>> = ({ ...props }) => {
  const [resultSearch, setResultSearch] = useState<ProductProjectionInterface[]>();

  setResultSearch([])


  return (
    <div className={styles.searchContainer}>
      <input className={styles.inputSearch} {...props} type="text" />
        {resultSearch && <div className={styles.searchList}>
        <div className={styles.searchListItem}>
          <img src={Image} alt=""/>
          <span>Название</span>
        </div>
      </div>}
    </div>
  );
};

export default InputSearch;
