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
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <div className={style.loaderContainer}>
        {load && (
          <div
            className={style.loader}
            style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
          >
            <LinearProgress color="success" />
          </div>
        )}
      </div>
      <Header />
      <main style={{ flex: 1 }} className="container">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
