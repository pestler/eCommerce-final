import React, {useCallback, useEffect, useState} from 'react';
import styles from './catalog.module.scss';
import Filter from "../../components/filter/Filter.tsx";
import {productsService} from "../../services";
import {Pagination} from "@mui/material";
import CatalogAppliedFilter from "../../components/catalogAppliedFilter/CatalogAppliedFilter.tsx";
import BasicMenu from "../../components/menu/Menu.tsx";
import {categoryMapper} from "../../mappers/category.mapper.ts";
import {ProductCategory, SubcategoryType} from "../../interface/productCategory.type.ts";
import {updateArrayUtil} from "../../utils";
import {useNavigate, useSearchParams} from "react-router-dom";
import {queryParamMapper} from "../../mappers/queryParam.mapper.ts";

const Catalog: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const param = searchParams.get('categories');
    const decodedParam = param ? decodeURIComponent(param) : null;

    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const [filters, setFilters] = useState<SubcategoryType[]>([]);

    const getCategories = useCallback(async () => {
        const { body } = await productsService.getCategories();
        const categories = categoryMapper.fromDto(body.results);
        if (decodedParam) {
            const filters = queryParamMapper.fromQueryParam(decodedParam, categories);
            setFilters(filters);
        }
        setCategories(categories);
    }, [decodedParam]);

    useEffect(() => {
        getCategories();
    }, [getCategories]);

    useEffect(() => {
        productsService.getAllSearch(filters)
            .then((r) => console.log(r))
    }, [filters]);

    const setQueryParam = (filters: string) => {
        const params = new URLSearchParams();
        filters ? params.set('categories', filters) : params.delete('categories')
        navigate(`?${params}`);
    };

    const sortEvent = (event: string) => {
        console.log(event)
    }

    const checkFilters = (payload: SubcategoryType) => {
        const updateFilters = updateArrayUtil<SubcategoryType>(filters, payload, 'id');
        const queryParamString = updateFilters.map((cat) => cat.name).join(',');
        setQueryParam(queryParamString);
        setFilters(updateFilters);
    }

  return (
    <div className={styles.container}>
        <div className={styles.breadcrumb}>breadcramb</div>
        <div className={styles.catalog}>
            <div className={styles.headerCatalog}>
                <div className={styles.title}>Каталог</div>
                <div className={styles.filtersSort}>
                    <div className={styles.currentFilters}>
                        {filters && filters.map((filter) =>
                            <CatalogAppliedFilter
                                deleteFilter={checkFilters}
                                filter={filter}
                                key={filter.id}
                            />
                        )}
                    </div>
                    <div>
                        <BasicMenu
                            buttonContent="Сортировать"
                            menuItems={['От А до Я', 'От Я до А', 'По возрастанию цены', 'По убыванию цены']}
                            menuEvent={sortEvent}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.filters}>
                {categories.map((category) =>
                    <Filter
                        type={'category'}
                        emitValue={checkFilters}
                        category={category}
                        currentFilters={filters}
                        key={category.id}
                    />
                )}
                {/*<Filter type="height" />*/}
                {/*<Filter type="diameter" />*/}
            </div>
            <div className={styles.catalogList}>

            </div>
        </div>
        <div className={styles.pagination}>
            <Pagination count={10} color="standard" />
        </div>
    </div>
  );
};

export default Catalog;
