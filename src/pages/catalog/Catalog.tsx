import React, {useCallback, useEffect, useState} from 'react';
import styles from './catalog.module.scss';
import Filter from "../../components/filter/Filter.tsx";
import {productsService} from "../../services";
import {CircularProgress, Pagination} from "@mui/material";
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
import {ISort} from "../../interface/sort.interface.ts";
import {SORTS} from "../../contstants/sorts.constants.ts";
import {Filters} from "../../interface/filters.type.ts";
import {useLoader} from "../../hooks/useLoader.ts";
import {useSnackbar} from "notistack";
import {BadRequest} from "../../interface/responseError.interface.ts";

const ITEMS_PER_PAGE = 6;

const Catalog: React.FC = () => {
    const {showLoader, hideLoader} = useLoader();
    const { enqueueSnackbar } = useSnackbar();
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
    const [filters, setFilters] = useState<Filters>({categories: [], attributes: {
            heightFrom: searchParams.get('heightFrom') ? Number(searchParams.get('heightFrom')) : undefined,
            heightTo: searchParams.get('heightTo') ? Number(searchParams.get('heightTo')) : undefined,
            diameterFrom: searchParams.get('diameterFrom') ? Number(searchParams.get('diameterFrom')) : undefined,
            diameterTo: searchParams.get('diameterTo') ? Number(searchParams.get('diameterTo')) : undefined,
        }});
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
            const filtersQuery = queryParamMapper.fromQueryParam(decodedParam, categories);
            setFilters({...filters, categories: filtersQuery});
        }
        setCategories(categories);
    }, [decodedParam]);

    const getProducts = useCallback(async (filters: Filters, pagination: {limit: number, offset: number}, sort: ISort) => {
        showLoader();
        try {
            const { body } = await productsService.getAllSearch(filters, pagination, sort);
            const products = body.results.map((product) => productProjectionMapper.fromDto(product));
            setTotalItems(body.total ?? 1);
            setProducts(products);
            hideLoader();
        } catch(e: unknown) {
            const { message } = e as BadRequest;
            enqueueSnackbar(
                `Ошибка при загрузке данных каталога: ${message}`,
                { variant: 'error' },
            );
            hideLoader();
        }
    }, [])


    useEffect(() => {
        setCurrentPage(Math.floor(pagination.offset / ITEMS_PER_PAGE) + 1);
        getProducts(filters!, pagination, sort)
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

    const setAttrParamHeight = (from?: number, to?: number) => {
        const params = new URLSearchParams(window.location.search);
        from ? params.set('heightFrom', from.toString()) : params.delete('heightFrom');
        to ? params.set('heightTo', to.toString()) : params.delete('heightTo');
        navigate(`?${params}`);
    };

    const setAttrParamDiameter = (from?: number, to?: number) => {
        const params = new URLSearchParams(window.location.search);
        from ? params.set('diameterFrom', from.toString()) : params.delete('diameterFrom');
        to ? params.set('diameterTo', to.toString()) : params.delete('diameterTo');
        navigate(`?${params}`);
    };

    const sortEvent = (valueEvent: string) => {
        const { name, value } = SORTS.find((item) => item.title === valueEvent)!;
        setSort({name, value})
        setSortParam({name, value})
    }

    const checkFilters = (payload: SubcategoryType) => {
        const updateFilters = updateArrayUtil<SubcategoryType>(filters!.categories, payload, 'id');
        const queryParamString = updateFilters.map((cat) => cat.name).join(',');
        setPagination({limit: ITEMS_PER_PAGE, offset: 0})
        setPaginationParam({limit: ITEMS_PER_PAGE, offset: 0});
        setQueryParam(queryParamString);
        setFilters({...filters, categories: updateFilters});
    }

    const checkFiltersAttr = ({ from, to, type }: { from?: number; to?: number; type: string }) => {
        if (type === 'height') {
            const currentHeightFrom = filters?.attributes?.heightFrom;
            const currentHeightTo = filters?.attributes?.heightTo;

            const updatedHeightFrom = from !== undefined ? from : currentHeightFrom;
            const updatedHeightTo = to !== undefined ? to : currentHeightTo;

            setFilters({
                ...filters,
                attributes: {
                    ...filters.attributes,
                    heightFrom: updatedHeightFrom,
                    heightTo: updatedHeightTo,
                },
            });
            setAttrParamHeight(updatedHeightFrom, updatedHeightTo);
            return;
        }

        if (type === 'diameter') {
            const currentDiameterFrom = filters?.attributes?.diameterFrom;
            const currentDiameterTo = filters?.attributes?.diameterTo;

            const updatedDiameterFrom = from !== undefined ? from : currentDiameterFrom;
            const updatedDiameterTo = to !== undefined ? to : currentDiameterTo;

            setFilters({
                ...filters,
                attributes: {
                    ...filters.attributes,
                    diameterFrom: updatedDiameterFrom,
                    diameterTo: updatedDiameterTo,
                },
            });
            setAttrParamDiameter(updatedDiameterFrom, updatedDiameterTo);
            return;
        }
    };

  return (
    <div className={styles.container}>
        {/*<div className={styles.breadcrumb}>breadcramb</div>*/}
        <div className={styles.catalog}>
            <div className={styles.headerCatalog}>
                <div className={styles.title}>Каталог</div>
                <div className={styles.filtersSort}>
                    <div className={styles.currentFilters}>
                        {filters && filters.categories.map((filter) =>
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
                            menuItems={SORTS.map((item) => item.title)}
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
                <Filter type="height"
                        currentFilters={filters}
                        emitValueAttr={checkFiltersAttr}
                />
                <Filter type="diameter"
                        currentFilters={filters}
                        emitValueAttr={checkFiltersAttr}
                />
            </div>
            <div className={styles.catalogList}>
                {products && products.map((product) =>
                    <Card product={product} key={product.id} />
                )}
                {!products && <CircularProgress color="success" />}
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
