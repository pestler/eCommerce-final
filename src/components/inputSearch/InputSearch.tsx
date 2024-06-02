import React, {ChangeEvent, FC, useCallback, useEffect, useState} from 'react';
import styles from './inputSearch.module.scss';

import {ProductProjectionInterface} from "../../interface/productProjection.interface.ts";
import {productsService} from "../../services";
import {productProjectionMapper} from "../../mappers/productProjection.mapper.ts";
import {debounce} from "../../utils";
import {Link} from "react-router-dom";

const InputSearch: FC<React.HTMLProps<HTMLInputElement>> = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [inputFocus, setInputFocus] = useState<boolean>(false);
    const [inputMouseEnter, setInputMouseEnter] = useState<boolean>(false);
    const [resultSearch, setResultSearch] = useState<ProductProjectionInterface[]>();

    const fetchSearchResults = async (query: string) => {
        try {
            const { body } = await productsService.searchProjections(query);
            const products = body.results.map((product) => productProjectionMapper.fromDto(product));
            setResultSearch(products);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setResultSearch([]);
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedFetchSearchResults = useCallback(debounce(fetchSearchResults, 100), []);

    useEffect(() => {
        if (inputValue) {
            debouncedFetchSearchResults(inputValue);
        } else {
            setResultSearch([]);
        }
    }, [inputValue, debouncedFetchSearchResults]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleInputFocus = (event: ChangeEvent<HTMLInputElement>) => {
        setInputFocus(true);
        if (event.target.value) {
            setInputValue(event.target.value);
        }
    };

    const handleInputBlur = () => {
        if (!inputMouseEnter) {
            setInputFocus(false)
        }
    };

  return (
    <div className={styles.searchContainer}>
      <input className={styles.inputSearch}
             placeholder={'Поиск'}
             value={inputValue}
             onChange={handleInputChange}
             onFocus={handleInputFocus}
             onBlur={handleInputBlur}
             type="text" />
        {(inputFocus && resultSearch) &&
            <div className={styles.searchList}
            onMouseEnter={() => setInputMouseEnter(true)}
            onMouseLeave={() => setInputMouseEnter(false)}
            >
            {resultSearch.map((product) =>
                <Link className={styles.searchListItem} key={product.id}
                      onClick={() => setInputFocus(false)}
                      to={`/catalog/${product.id}`}>
                    <img src={product.images[0].url} alt={product.name}/>
                    <span>{product.name}</span>
                </Link>
            )}
        </div>}
    </div>
  );
};

export default InputSearch;
