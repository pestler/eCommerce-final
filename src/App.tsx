import { SnackbarProvider } from 'notistack';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Layout from './Layout.tsx';
import { AuthProvider, LoaderProvider } from './providers';
import { CartProvider } from './providers/CartProvider.tsx';
import { router } from './router';
import { ErrorBoundary } from "react-error-boundary";

const App: React.FC = () => {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
    <LoaderProvider>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >       
        <CartProvider>
          <AuthProvider>
            <BrowserRouter>
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
            </BrowserRouter>
          </AuthProvider>
        </CartProvider>
      </SnackbarProvider>
    </LoaderProvider>
    </ErrorBoundary>
  );
};

export default App;
