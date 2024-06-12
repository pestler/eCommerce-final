import React from 'react';
import Cross from '../../assets/svg/cross.svg';
import { FilterKeyValueByAttributes } from '../../interface/filters.type.ts';
import { SubcategoryType } from '../../interface/productCategory.type.ts';
import { setFilterUtil } from '../../utils/setFilter.util.ts';
import styles from './catalogAppliedFilter.module.scss';

type Props = {
  filter: SubcategoryType | FilterKeyValueByAttributes;
  deleteFilter: (name: SubcategoryType | FilterKeyValueByAttributes) => void;
};

const CatalogAppliedFilter: React.FC<Props> = ({ filter, deleteFilter }) => {
  const setValue = (
    filter: SubcategoryType | FilterKeyValueByAttributes,
  ): string => {
    if (typeof filter === 'object' && 'name' in filter) {
      return (filter as SubcategoryType).name;
    } else {
      return setFilterUtil(filter);
    }
  };
  return (
    <div className={styles.catalogAppliedFilter}>
      <span>{setValue(filter)}</span>
      <span className={styles.icon} onClick={() => deleteFilter(filter)}>
        <Cross />
      </span>
    </div>
  );
};

export default CatalogAppliedFilter;
