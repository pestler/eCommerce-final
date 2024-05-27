import { SnackbarProvider } from 'notistack';
import React, {useEffect} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Layout from './Layout.tsx';
import { AuthProvider } from './providers';
import { router } from './router';

const App: React.FC = () => {

    useEffect(() => {

    }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Layout>
            <Routes>
              {router.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </Layout>
        </SnackbarProvider>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
