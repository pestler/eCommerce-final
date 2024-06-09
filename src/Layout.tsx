import { LinearProgress } from '@mui/material';
import React, { ReactNode } from 'react';
import Footer from './components/footer/Footer.tsx';
import Header from './components/header/Header.tsx';
import style from './components/menu/menu.module.scss';
import { useLoader } from './hooks/useLoader.ts';

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const { load } = useLoader();
  return (
    <>
      <div className={style.loaderContainer}>
        {load && (
          <div className={style.loader}>
            <LinearProgress color="success" />
          </div>
        )}
      </div>
      <Header />
      <main className="container">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
