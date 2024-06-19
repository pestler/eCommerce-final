import { SnackbarProvider } from 'notistack';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Layout from './Layout.tsx';
import PageTitle from './components/pageTitle/PageTitle.tsx';
import {
  AuthProvider,
  CartProvider,
  LoaderProvider,
  ModalProvider,
} from './providers';
import { router } from './router';

const App: React.FC = () => {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
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
                          element={
                            <>
                              {route.pageTitle && (
                                <PageTitle title={route.pageTitle} />
                              )}
                              {route.element}
                            </>
                          }
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
    </ErrorBoundary>
  );
};

export default App;
