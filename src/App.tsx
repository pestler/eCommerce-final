import { SnackbarProvider } from 'notistack';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Layout from './Layout.tsx';
import { AuthProvider, LoaderProvider } from './providers';
import { CartProvider } from './providers/CartProvider.tsx';
import { router } from './router';
import {ModalProvider} from "./providers/ModalProvider.tsx";

const App: React.FC = () => {
  return (
    <LoaderProvider>
      <SnackbarProvider
        autoHideDuration={800}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
          <ModalProvider>
              <CartProvider>
                      <BrowserRouter>
                          <AuthProvider>
                          <Layout>
                              <Routes>
                                  {router.map((route, index) => (
                                      <Route
                                          key={index}
                                          path={route.path}
                                          element={route.element}
                                      />
                                  ))}
                              </Routes>
                          </Layout>
                          </AuthProvider>
                      </BrowserRouter>
              </CartProvider>
          </ModalProvider>
      </SnackbarProvider>
    </LoaderProvider>
  );
};

export default App;
