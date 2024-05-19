import React, {ReactNode} from 'react';
import Header from "./components/header/Header.tsx";
import Footer from "./components/footer/Footer.tsx";

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

