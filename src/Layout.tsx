import React, { ReactNode } from 'react';
import Footer from './components/footer/Footer.tsx';
import Header from './components/header/Header.tsx';

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="container">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
