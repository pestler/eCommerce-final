import React, {useEffect, useState} from 'react';
import styles from './filter.module.scss';
import ArrowTop from '../../assets/svg/arrow-top.svg';
import ArrowBottom from '../../assets/svg/arrow-bottom.svg';
import {ProductCategory, SubcategoryType} from "../../interface/productCategory.type.ts";

type PropsFilter = {
    category?: ProductCategory,
    type: 'height' | 'diameter' | 'category',
    emitValue: (payload: SubcategoryType, category: ProductCategory) => void;
    currentFilters: SubcategoryType[]
}

const Filter: React.FC<PropsFilter> = ({category, type, emitValue, currentFilters}) => {
    const [open, setOpen] = useState<boolean>(false);

    const title = () => {
        if (category) return category.name;
        if (type && type === 'height') {
            return 'Высота';
        } else {
            return 'Диаметр';
        }
    }

    useEffect(() => {
        if (category && category.subcategories.length && currentFilters && currentFilters.length) {
            const open = category.subcategories.find((sub) => sub.id === currentFilters[0].id);
            setOpen(!!open);
        }
    }, [category, currentFilters]);

    return (
        <div className={styles.catalogFilter}>
            <div onClick={() => setOpen(!open)}
                 className={`${styles.catalogFilterHead} ${open ? styles.openHead : ''}`}>
                <span className="title">{title()}</span>
                {open && <span className="svg"><ArrowTop/></span>}
                {!open && <span className="svg"><ArrowBottom/></span>}
            </div>
            {category && <div className={`${styles.catalogFilterBody} ${open ? styles.open : ''} `}>
                {category.subcategories.map((subCategory) =>
                    <label className={styles.catalogFilterCheckbox} key={subCategory.id}>
                        <input className={styles.input}
                               type="checkbox"
                               checked={currentFilters.map((c) => c.id).includes(subCategory.id)}
                               onChange={() => emitValue(subCategory, category)}
                        />
                        <span>{subCategory.name}</span>
                    </label>
                )}
            </div>}
            {type && !category &&
                <div className={`${styles.catalogFilterFromTo} ${open ? styles.openCatalogFilterCheckbox : ''} `}>
                    <span>от</span>
                    <input type="number" min="0" step="1" className={styles.smallInput}/>
                    <span>до</span>
                    <input type="number" min="0" step="1" className={styles.smallInput}/>
                    <span>см</span>
                </div>
            }
        </div>
    );
};

export default Filter;
