import { createContext, ReactNode, useState } from 'react';

export interface ILoaderContext {
  load: boolean;
  showLoader: () => void;
  hideLoader: () => void;
}

interface Props {
  children: ReactNode;
}

export const LoaderContext = createContext<ILoaderContext | undefined>(
  undefined,
);

export const LoaderProvider = ({ children }: Props) => {
  const [load, setLoad] = useState<boolean>(false);

  const showLoader = () => {
    setLoad(true);
  };

  const hideLoader = () => {
    setLoad(false);
  };

  return (
    <LoaderContext.Provider value={{ load, showLoader, hideLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};
