import { Checkbox } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowBottom from '../../assets/svg/arrow-bottom.svg';
import ArrowTop from '../../assets/svg/arrow-top.svg';
import { Filters } from '../../interface/filters.type.ts';
import {
  ProductCategory,
  SubcategoryType,
} from '../../interface/productCategory.type.ts';
import styles from './filter.module.scss';

type PropsFilter = {
  category?: ProductCategory;
  type: 'height' | 'diameter' | 'category';
  emitValue?: (payload: SubcategoryType) => void;
  emitValueAttr?: (payload: {
    from?: number;
    to?: number;
    type: string;
  }) => void;
  currentFilters: Filters;
};

const Filter: React.FC<PropsFilter> = ({
  category,
  type,
  emitValue,
  emitValueAttr,
  currentFilters,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [fromValue, setFromValue] = useState<number | string>('');
  const [toValue, setToValue] = useState<number | string>('');

  const title = () => {
    if (category) return category.name;
    if (type && type === 'height') {
      return 'Высота';
    } else {
      return 'Диаметр';
    }
  };

  useEffect(() => {
    if (
      category &&
      category.subcategories.length &&
      currentFilters.categories &&
      currentFilters.categories.length
    ) {
      currentFilters.categories.forEach((current) => {
        category.subcategories.forEach((category) => {
          if (current.id === category.id) {
            setOpen(true);
            return;
          }
        });
      });
    }
    if (type === 'height') {
      setFromValue(currentFilters.attributes.heightFrom ?? '');
      setToValue(currentFilters.attributes.heightTo ?? '');
      if (
        currentFilters.attributes.heightFrom ||
        currentFilters.attributes.heightTo
      ) {
        setOpen(true);
      }
    }
    if (type === 'diameter') {
      setFromValue(currentFilters.attributes.diameterFrom ?? '');
      setToValue(currentFilters.attributes.diameterTo ?? '');
      if (
        currentFilters.attributes.diameterFrom ||
        currentFilters.attributes.diameterTo
      ) {
        setOpen(true);
      }
    }
  }, [category, currentFilters, type]);

  const handleFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;
    setFromValue(value);
    emitValueAttr!({ from: +event.target.value, type });
  };

  const handleToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;
    setToValue(value);
    emitValueAttr!({ to: +event.target.value, type });
  };

  return (
    <div className={styles.catalogFilter}>
      <div
        onClick={() => setOpen(!open)}
        className={`${styles.catalogFilterHead} ${open ? styles.openHead : ''}`}
      >
        <span className="title">{title()}</span>
        {!open && (
          <span className="svg">
            <ArrowTop />
          </span>
        )}
        {open && (
          <span className="svg">
            <ArrowBottom />
          </span>
        )}
      </div>
      {category && (
        <div
          className={`${styles.catalogFilterBody} ${open ? styles.open : ''} `}
        >
          {category.subcategories.map((subCategory) => (
            <label
              className={styles.catalogFilterCheckbox}
              key={subCategory.id}
            >
              <Checkbox
                checked={currentFilters.categories
                  .map((c) => c.id)
                  .includes(subCategory.id)}
                onChange={() => emitValue!(subCategory)}
                color="success"
              />
              <span>{subCategory.name}</span>
            </label>
          ))}
        </div>
      )}
      {type && !category && (
        <div
          className={`${styles.catalogFilterFromTo} ${open ? styles.openCatalogFilterCheckbox : ''} `}
        >
          <span>от</span>
          <input
            type="number"
            name="from"
            max={toValue ? toValue : 99999999999999}
            min={0}
            step="1"
            value={fromValue}
            onChange={handleFromChange}
            className={styles.smallInput}
          />
          <span>до</span>
          <input
            type="number"
            name="to"
            min={fromValue ? fromValue : 0}
            step="1"
            value={toValue}
            onChange={handleToChange}
            className={styles.smallInput}
          />
          <span>см</span>
        </div>
      )}
    </div>
  );
};

export default Filter;
