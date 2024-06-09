import React from 'react';
import Cross from '../../assets/svg/cross.svg';
import { SubcategoryType } from '../../interface/productCategory.type.ts';
import styles from './catalogAppliedFilter.module.scss';

type Props = {
  filter: SubcategoryType;
  deleteFilter: (name: SubcategoryType) => void;
};

const CatalogAppliedFilter: React.FC<Props> = ({ filter, deleteFilter }) => {
  return (
    <div className={styles.catalogAppliedFilter}>
      <span>{filter.name}</span>
      <span className={styles.icon} onClick={() => deleteFilter(filter)}>
        <Cross />
      </span>
    </div>
  );
};

export default CatalogAppliedFilter;
