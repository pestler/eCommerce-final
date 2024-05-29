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
import {productProjectionMapper} from "../../mappers/productProjection.mapper.ts";
import {ProductProjectionInterface} from "../../interface/productProjection.interface.ts";
import Card from "../../components/card/Card.tsx";
import {ISort, ISortMenuItem} from "../../interface/sort.interface.ts";
import {SORTS} from "../../contstants/sorts.constants.ts";

const ITEMS_PER_PAGE = 6;

const Catalog: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const param = searchParams.get('categories');
    const decodedParam = param ? decodeURIComponent(param) : null;

    const offset = searchParams.get('offset');
    const decodedParamOffset = offset ? decodeURIComponent(offset) : null;

    const sortName = searchParams.get('sort_name');
    const decodedParamSortName = sortName ? decodeURIComponent(sortName) : null;

    const sortValue = searchParams.get('sort_value');
    const decodedParamSortValue = sortValue ? decodeURIComponent(sortValue) : null;

    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const [filters, setFilters] = useState<SubcategoryType[]>([]);
    const [products, setProducts] = useState<ProductProjectionInterface[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState<number>(1);
    const [pagination, setPagination] = useState<{limit: number, offset: number}>({ limit: ITEMS_PER_PAGE, offset: decodedParamOffset ? +decodedParamOffset : 0 });
    const [sort, setSort] = useState<ISort>({ name: decodedParamSortName ?? 'name.ru-by', value: decodedParamSortValue ?? 'asc' });

    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
        setPagination({...pagination, offset: (page - 1) * ITEMS_PER_PAGE})
        setPaginationParam({limit: ITEMS_PER_PAGE, offset: (page - 1) * ITEMS_PER_PAGE})
    };

    const getCategories = useCallback(async () => {
        const { body } = await productsService.getCategories();
        const categories = categoryMapper.fromDto(body.results);
        if (decodedParam) {
            const filters = queryParamMapper.fromQueryParam(decodedParam, categories);
            setFilters(filters);
        }
        setCategories(categories);
    }, [decodedParam]);

    const getProducts = useCallback(async (filters: SubcategoryType[], pagination: {limit: number, offset: number}, sort: ISort) => {
        const { body } = await productsService.getAllSearch(filters, pagination, sort);
        const products = body.results.map((product) => productProjectionMapper.fromDto(product));
        setTotalItems(body.total ?? 1);
        setProducts(products);
    }, [])

    useEffect(() => {
        setCurrentPage(Math.floor(pagination.offset / ITEMS_PER_PAGE) + 1);
        getProducts(filters, pagination, sort)
    }, [filters, getProducts, pagination, sort]);

    useEffect(() => {
        getCategories();
    }, [getCategories]);

    const setQueryParam = (filters: string) => {
        const params = new URLSearchParams(window.location.search);
        filters ? params.set('categories', filters) : params.delete('categories');
        navigate(`?${params}`);
    };

    const setSortParam = (sort: ISort) => {
        const params = new URLSearchParams(window.location.search);
        sort && params.set('sort_name', sort.name);
        sort && params.set('sort_value', sort.value);
        navigate(`?${params}`);
    };

    const setPaginationParam = (pagination: {limit: number, offset: number}) => {
        const params = new URLSearchParams(window.location.search);
        pagination.limit ? params.set('limit', pagination.limit.toString()) : params.delete('limit');
        pagination.offset ? params.set('offset', pagination.offset.toString()) : params.delete('offset');
        navigate(`?${params}`);
    };

    const sortEvent = ({name, value}: ISortMenuItem) => {
        setSort({name, value})
        setSortParam({name, value})
    }

    const checkFilters = (payload: SubcategoryType) => {
        const updateFilters = updateArrayUtil<SubcategoryType>(filters, payload, 'id');
        const queryParamString = updateFilters.map((cat) => cat.name).join(',');
        setPagination({limit: ITEMS_PER_PAGE, offset: 0})
        setPaginationParam({limit: ITEMS_PER_PAGE, offset: 0});
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
                            menuItems={SORTS}
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
                {products && products.map((product) =>
                    <Card product={product} key={product.id} />
                )}
            </div>
        </div>
        <div className={styles.pagination}>
        {Math.ceil(totalItems / ITEMS_PER_PAGE) > 1 &&
                <Pagination
                    count={Math.ceil(totalItems / ITEMS_PER_PAGE)}
                    color="standard"
                    page={currentPage}
                    onChange={handlePageChange}
                />
        }
        </div>
    </div>
  );
};

export default Catalog;
