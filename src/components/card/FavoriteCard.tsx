import { useRef } from 'react';
import useLocalStorage from 'react-use-localstorage';
import styles from './card.module.scss';

export interface FavouriteProps {
  id: string;
}

export const FavouriteCard = ({ id }: FavouriteProps): JSX.Element | null => {
  const [storageItem, setStorageItem] = useLocalStorage(
    'favourites-card',
    JSON.stringify([]),
  );
  const storagedArray = useRef(JSON.parse(storageItem));
  const isFavourited = storagedArray.current.includes(id);

  const handleToggleFavourite = (): void => {
    if (!isFavourited) {
      storagedArray.current.push(id);
      setStorageItem(JSON.stringify(storagedArray.current));
    } else {
      const indexFavouritedId = storagedArray.current.indexOf(id);
      storagedArray.current.splice(indexFavouritedId, 1);
      setStorageItem(JSON.stringify(storagedArray.current));
    }
  };
  return (
    <div onClick={handleToggleFavourite}>
    {isFavourited ? (
        <div className={styles.card__favorite}></div>
      ) : (
        <div className={styles.card__favorite__active} ></div>
      )}
    </div>
  );
};