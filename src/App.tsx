import { SnackbarProvider } from 'notistack';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Layout from './Layout.tsx';
import {
  AuthProvider,
  CartProvider,
  LoaderProvider,
  ModalProvider,
} from './providers';
import { router } from './router';

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
