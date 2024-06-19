import { useContext } from 'react';
import { ILoaderContext, LoaderContext } from '../providers';

export const useLoader = (): ILoaderContext => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useLoader должен использоваться внутри LoaderProvider');
  }
  return context;
};
